const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({}),
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const folderName = 'Broskii Trips Gallery';
    
    // Search for images in the specified folder
    const result = await cloudinary.search
      .expression(`folder:"${folderName}"`)
      .sort_by('created_at', 'desc')
      .max_results(500) // Cloudinary's max per request
      .execute();

    if (!result.resources || result.resources.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ images: [] }),
      };
    }

    // Transform the results to include optimized URLs
    const images = result.resources.map((resource) => {
      // Use the public_id directly as returned by Cloudinary search API
      // It already includes the full path (e.g., "Broskii Trips Gallery/IMG-20250117-WA0041_kwrbhv")
      const effectivePublicId = resource.public_id;

      // Generate versioned thumbnail URL (400x300, crop: limit, no cropping)
      const thumbnailUrl = cloudinary.url(effectivePublicId, {
        width: 400,
        height: 300,
        crop: 'fill',
        quality: 'auto',
        format: resource.format,
        version: resource.version,
      });

      // Generate versioned full-size URL
      const fullUrl = cloudinary.url(effectivePublicId, {
        quality: 'auto',
        format: resource.format,
        version: resource.version,
      });

      return {
        id: resource.public_id,
        url: thumbnailUrl,
        fullUrl: fullUrl,
        alt: resource.filename || resource.public_id,
        created_at: resource.created_at,
      };
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ images }),
    };
  } catch (error) {
    console.error('Cloudinary error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch images',
        details: error.message 
      }),
    };
  }
};