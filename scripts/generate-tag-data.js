const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { slug } = require('github-slugger')

// Function to extract tags from MDX files
function generateTagData(includeDrafts = false) {
  const blogDir = path.join(__dirname, '../data/blog/post')
  const tagCounts = {}

  // Read all MDX files in the blog directory
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.mdx'))

  files.forEach((file) => {
    const filePath = path.join(blogDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')

    try {
      const { data } = matter(fileContent)

      // Skip draft posts unless includeDrafts is true
      if (data.draft === true && !includeDrafts) {
        return
      }

      // Process tags if they exist
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag) => {
          const sluggedTag = slug(tag)
          tagCounts[sluggedTag] = (tagCounts[sluggedTag] || 0) + 1
        })
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error.message)
    }
  })

  // Write the tag data to JSON file
  const outputPath = path.join(__dirname, '../app/tag-data.json')
  fs.writeFileSync(outputPath, JSON.stringify(tagCounts, null, 2))

  console.log('Tag data generated successfully!')
  console.log('Include drafts:', includeDrafts)
  console.log('Tags found:', Object.keys(tagCounts).length)
  console.log('Tag counts:', tagCounts)
}

// Export the function for external use
module.exports = { generateTagData }

// Run the script with default behavior (exclude drafts)
if (require.main === module) {
  generateTagData()
}
