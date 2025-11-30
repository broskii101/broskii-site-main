const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const formData = JSON.parse(event.body);

    const {
      fullName,
      email,
      phone,
      city,
      age,
      emergencyContactName,
      emergencyContactNumber,
      skiingExperience,
      equipmentRental,
      equipmentRentalOption,
      lessons,
      roomPreference,
      travelPlans,
      selectedPaymentOption,
      waiver,
      extrasTerms,
      terms,
      electronicSignature,
    } = formData;

await resend.emails.send({ 
  from: 'Broskii Alerts <info@broskii.co>',
  to: [email],
  subject: 'Broskii Trip Booking Confirmation',
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Broskii Booking Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#FFFEFA; font-family: Arial, sans-serif; color:#263c43;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFEFA; padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background-color:#f5f5f5; text-align:center; padding:15px 0 10px;">
              <img src="https://unique-sorbet-235561.netlify.app/broskii_logo.png" alt="Broskii Logo" width="180" style="display:block; margin:0 auto 8px;" />
              <p style="margin:8px 0 4px; font-size:24px; font-weight:bold; color:#000000;">Broskii Trip Confirmed</p>
              <p style="margin:0; font-size:16px; font-style:italic; color:#000000;">Let the countdown begin!</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding:30px;">
              <p style="font-size:16px; line-height:1.6; margin-top:0; color:#263c43;">As-salamu alaykum <strong>${fullName}</strong>,</p>

              <p style="font-size:16px; line-height:1.6; color:#263c43;">
                We're excited to confirm your spot on the upcoming <strong>Broskii</strong> trip. 
              </p>

              <h3 style="font-size:18px; margin-top:30px; margin-bottom:10px; color:#007CB0;">💳 Payment Summary:</h3>
              <ul style="padding-left:20px; margin-top:0; font-size:16px; line-height:1.6; color:#263c43;">
                <li>If you’ve <strong>paid a deposit</strong>, you will receive a payment link for the remaining balance <strong>12 weeks before the trip</strong>. Please ensure all payments are completed <strong>10 weeks before departure</strong>.</li>
                <li>If you’ve <strong>paid in full</strong>, you’re all set — unless you selected extras when booking, in which case we'll send you the pricing details for you to confirm the add ons.</li>
              </ul>

              <h3 style="font-size:18px; margin-top:30px; margin-bottom:10px; color:#007CB0;">📱 What Happens Next:</h3>
              <ul style="padding-left:20px; margin-top:0; font-size:16px; line-height:1.6; color:#263c43;">
                <li>You’ll be added to the <strong>Broskii WhatsApp group</strong> where we’ll share updates, packing tips, travel reminders, and more.</li>
                <li>A few weeks before departure, you’ll receive a <strong>comprehensive information pack</strong> with everything you need to know — from airport arrival details to your first day on the slopes.</li>
              </ul>

              <p style="font-size:16px; line-height:1.6; color:#263c43;">If you have any questions, just reply to this email or message us directly.</p>

              <p style="font-size:16px; line-height:1.6; color:#263c43;">we look forward to having you with us,</p>
              <p style="font-size:16px; line-height:1.6; color:#263c43;"><strong>The Broskii Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#97cfe6; padding:20px; text-align:center; font-size:14px; color:#263c43;">

              <!-- Social text links side by side -->
              <p style="margin:0 0 10px;">
                <a href="https://www.instagram.com/broskiiuk" style="margin: 0 12px; color:#263c43; text-decoration:none; font-weight:bold;">Instagram</a>
                <a href="https://www.tiktok.com/@broskiiuk" style="margin: 0 12px; color:#263c43; text-decoration:none; font-weight:bold;">TikTok</a>
                <a href="https://www.youtube.com/@broskiiuk" style="margin: 0 12px; color:#263c43; text-decoration:none; font-weight:bold;">YouTube</a>
              </p>

              <!-- Contact details stacked below -->
              <p style="margin:0 0 5px; line-height:1.5;">
                <a href="https://www.broskii.co" style="color:#263c43; text-decoration:none; display:block;">www.broskii.co</a>
                <a href="mailto:salaam@broskii.co" style="color:#263c43; text-decoration:none; display:block; margin-top:4px;">salaam@broskii.co</a>
                <a href="https://wa.me/447749939192" style="color:#263c43; text-decoration:none; display:block; margin-top:4px;">WhatsApp or call us</a>
              </p>

              <p style="margin-top:15px; color:#1f2937; font-size:12px;">© 2025 Broskii. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`
});




    // Send notification email to admin
    await resend.emails.send({
      from: 'Broskii Alerts <info@broskii.co>',
      to: ['salaam@broskii.co'],
      subject: `📥 New Booking from ${fullName}`,
      html: `
        <h2>New Ski Trip Booking</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>City:</strong> ${city || 'N/A'}</p>
        <p><strong>Age:</strong> ${age || 'N/A'}</p>
        <p><strong>Emergency Contact Name:</strong> ${emergencyContactName || 'N/A'}</p>
        <p><strong>Emergency Contact Number:</strong> ${emergencyContactNumber || 'N/A'}</p>
        <p><strong>Experience Level:</strong> ${skiingExperience || 'N/A'}</p>
        <p><strong>Equipment Rental:</strong> ${equipmentRental || 'N/A'}</p>
        <p><strong>Rental Option:</strong> ${equipmentRentalOption || 'N/A'}</p>
        <p><strong>Lessons:</strong> ${lessons || 'N/A'}</p>
        <p><strong>Room Preference:</strong> ${roomPreference || 'N/A'}</p>
        <p><strong>Travel Plans:</strong> ${travelPlans || 'N/A'}</p>
        <p><strong>Payment Option:</strong> ${selectedPaymentOption || 'N/A'}</p>
        <p><strong>Waiver Agreed:</strong> ${waiver ? '✓ Yes' : '✗ No'}</p>
        <p><strong>Extras Adjusted:</strong> ${extrasTerms ? '✓ Yes' : '✗ No'}</p>
        <p><strong>Terms Accepted:</strong> ${terms ? '✓ Yes' : '✗ No'}</p>
        <p><strong>Electronic Signature:</strong> ${electronicSignature || 'N/A'}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <hr />
        <p style="font-size: 12px; color: #666;">Full data also stored in Supabase.</p>
      `,
      text: `
New Ski Trip Booking

Name: ${fullName}
Email: ${email}
Phone: ${phone || 'N/A'}
City: ${city || 'N/A'}
Age: ${age || 'N/A'}
Emergency Contact Name: ${emergencyContactName || 'N/A'}
Emergency Contact Number: ${emergencyContactNumber || 'N/A'}
Experience Level: ${skiingExperience || 'N/A'}
Equipment Rental: ${equipmentRental || 'N/A'}
Rental Option: ${equipmentRentalOption || 'N/A'}
Lessons: ${lessons || 'N/A'}
Room Preference: ${roomPreference || 'N/A'}
Travel Plans: ${travelPlans || 'N/A'}
Payment Option: ${selectedPaymentOption || 'N/A'}
Waiver Agreed: ${waiver ? 'Yes' : 'No'}
Extras Adjusted: ${extrasTerms ? 'Yes' : 'No'}
Terms Accepted: ${terms ? 'Yes' : 'No'}
Electronic Signature: ${electronicSignature || 'N/A'}
Submitted: ${new Date().toLocaleString()}

Full data also stored in Supabase.
      `,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Emails sent' }),
    };
  } catch (error) {
    console.error('Resend error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
};