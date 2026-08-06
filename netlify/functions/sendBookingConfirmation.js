import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
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

    const firstName = fullName
      ?.trim()
      .split(' ')[0]
      .toLowerCase()
      .replace(/^./, (character) => character.toUpperCase());

    /* ================= CUSTOMER EMAIL ================= */

    await resend.emails.send({
      from: 'Broskii <info@broskii.com>',
      to: [email],
      subject: 'Booking Confirmation & Next Steps',
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta
    name="format-detection"
    content="telephone=no,address=no,email=no,date=no,url=no"
  />
  <title>Broskii Booking Received</title>

  <style>
    html,
    body,
    table,
    td,
    p,
    a,
    h1,
    h2,
    h3 {
      -webkit-text-size-adjust: 100% !important;
      -ms-text-size-adjust: 100% !important;
    }

    table,
    td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }

    img {
      -ms-interpolation-mode: bicubic;
    }

    .payment-button {
      white-space: nowrap !important;
    }

    @media only screen and (max-width: 600px) {
      .email-outer {
        padding: 12px 6px !important;
      }

      .email-header {
        padding: 20px 18px !important;
      }

      .hero-section {
        padding: 38px 20px 36px !important;
      }

      .hero-title {
        font-size: 37px !important;
        line-height: 1.1 !important;
      }

      .section-title {
        font-size: 31px !important;
        line-height: 1.15 !important;
      }

      .card-title {
        font-size: 30px !important;
        line-height: 1.15 !important;
      }

      .closing-title {
        font-size: 30px !important;
        line-height: 1.17 !important;
      }

      .content-side-padding {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }

      .card-padding {
        padding: 26px 20px !important;
      }

      .payment-button {
        font-size: 16px !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
        white-space: nowrap !important;
      }
    }

    @media only screen and (max-width: 390px) {
      .hero-title {
        font-size: 34px !important;
      }

      .section-title {
        font-size: 29px !important;
      }

      .card-title,
      .closing-title {
        font-size: 28px !important;
      }

      .payment-button {
        font-size: 15px !important;
        letter-spacing: -0.2px !important;
      }
    }
  </style>

</head>

<body
  style="margin:0; padding:0; width:100%; background-color:#f3f4f6; color:#111827; font-family:Arial,Helvetica,sans-serif; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;"
>

  <div
    style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent; line-height:1px; font-size:1px;"
  >
    Your Broskii trip starts here. We've received your booking details. Complete payment if required, and we'll guide you through the next steps.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="width:100%; margin:0; padding:0; background-color:#f3f4f6; border-collapse:collapse;"
  >
    <tr>
      <td align="center" class="email-outer" style="padding:24px 12px;">

        <table
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width:100%; max-width:700px; margin:0 auto; background-color:#ffffff; border-collapse:separate; border-spacing:0; overflow:hidden;"
        >

          <!-- Header -->
          <tr>
            <td class="email-header" style="padding:24px 28px; background-color:#EAF7FB;">

              <table
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="width:100%; border-collapse:collapse;"
              >
                <tr>
                  <td
                    align="left"
                    valign="middle"
                    style="font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.4; font-weight:800; letter-spacing:1.5px; color:#0087BD;"
                  >
                    YOUR TRIP
                  </td>

                  <td align="right" valign="middle">
                    <img
                      src="https://res.cloudinary.com/dtx0og5tm/image/upload/v1767127511/broskii-logo-email-header_fknl2k.png"
                      alt="Broskii"
                      width="72"
                      style="display:block; width:72px; max-width:72px; height:auto; margin:0 0 0 auto; border:0; outline:none; text-decoration:none;"
                    />
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td
              align="center"
              class="hero-section"
              style="padding:52px 28px 48px; background-color:#ffffff;"
            >

              <p
                style="margin:0 0 18px; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.4; font-weight:800; letter-spacing:1.5px; color:#0087BD;"
              >
                THE COUNTDOWN BEGINS
              </p>

              <h1
                class="hero-title" style="margin:0; padding:0; font-family:Georgia,'Times New Roman',serif; font-size:48px; line-height:1.08; font-weight:700; color:#111827;"
              >
                One step closer to the slopes
              </h1>

              <p
                style="margin:24px auto 0; padding:0; max-width:570px; font-family:Arial,Helvetica,sans-serif; font-size:19px; line-height:1.65; color:#3F5663;"
              >
                As-salamu alaykum
                <strong style="color:#111827;">${firstName}</strong>,
                we’ve received your booking details and can’t wait to welcome you on the slopes.
              </p>

              <p
                style="margin:14px auto 0; padding:0; max-width:570px; font-family:Arial,Helvetica,sans-serif; font-size:19px; line-height:1.65; color:#3F5663;"
              >
                <strong style="color:#111827;">Already paid on our website? You’re all set — no further action is needed.</strong>
              </p>

              <p
                style="margin:12px auto 0; padding:0; max-width:570px; font-family:Arial,Helvetica,sans-serif; font-size:19px; line-height:1.65; color:#3F5663;"
              >
                If you haven’t paid yet, choose one of the payment options below.
              </p>

              <p
                style="margin:12px auto 0; padding:0; max-width:570px; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:1.65; color:#3F5663;"
              >
                <strong style="color:#111827;">Please note:</strong> Your place is only secured once we’ve received either your deposit or full payment.
              </p>

            </td>
          </tr>

          <!-- Payment heading -->
          <tr>
            <td
              align="center"
              style="padding:48px 28px 32px; background-color:#F8FCFD;"
            >

              <p
                style="margin:0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.4; font-weight:800; letter-spacing:1.5px; color:#0087BD;"
              >
                PAYMENT
              </p>

              <h2
                class="section-title" style="margin:14px 0 0; padding:0; font-family:Georgia,'Times New Roman',serif; font-size:38px; line-height:1.14; font-weight:700; color:#111827;"
              >
                Choose how you'd like to pay
              </h2>

              <p
                style="margin:18px auto 0; padding:0; max-width:570px; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:1.65; color:#526875;"
              >
                Bank transfer is free. Card payments include a 2% processing fee.
              </p>

            </td>
          </tr>

          <!-- Deposit card -->
          <tr>
            <td class="content-side-padding" style="padding:0 28px 24px; background-color:#F8FCFD;">

              <table
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="width:100%; background-color:#ffffff; border:1px solid #D9EDF5; border-radius:20px; border-collapse:separate;"
              >
                <tr>
                  <td class="card-padding" style="padding:32px 28px;">

                    <p
                      style="margin:0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.4; font-weight:800; letter-spacing:1.5px; color:#0087BD;"
                    >
                      OPTION ONE
                    </p>

                    <h2
                      class="card-title" style="margin:12px 0 0; padding:0; font-family:Georgia,'Times New Roman',serif; font-size:36px; line-height:1.12; font-weight:700; color:#111827;"
                    >
                      Pay Deposit
                    </h2>

                    <p
                      style="margin:16px 0 0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:1.6; color:#3F5663;"
                    >
                      Reserve your place today with a
                      <strong style="color:#111827;">£300 deposit</strong>.
                    </p>

                    <p
                      style="margin:8px 0 0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:1.6; color:#526875;"
                    >
                      Your remaining balance is due 10 weeks before departure. We’ll remind you closer to the due date.
                    </p>

                    <table
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width:100%; margin-top:26px; border-collapse:separate;"
                    >
                      <tr>
                        <td
                          align="center"
                          style="background-color:#0087BD; border-radius:13px;"
                        >
                          <a
                            class="payment-button"
                            href="https://monzo.com/pay/r/broskii-ltd_Ix3i7XNVQFXQ2I"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="display:block; padding:19px 18px; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:1.2; font-weight:800; color:#ffffff; text-decoration:none; border-radius:13px;"
                          >
                            BANK TRANSFER — £300
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p
                      style="margin:9px 0 0; padding:0; text-align:center; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.5; font-weight:700; color:#0087BD;"
                    >
                      No payment fee
                    </p>

                    <table
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width:100%; margin-top:18px; border-collapse:separate;"
                    >
                      <tr>
                        <td
                          align="center"
                          style="background-color:#111827; border-radius:13px;"
                        >
                          <a
                            class="payment-button"
                            href="https://monzo.com/pay/r/broskii-ltd_sLaDokHTqy4CNd"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="display:block; padding:19px 18px; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:1.2; font-weight:800; color:#ffffff; text-decoration:none; border-radius:13px;"
                          >
                            CARD PAYMENT — £306
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p
                      style="margin:9px 0 0; padding:0; text-align:center; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.5; color:#526875;"
                    >
                      Includes 2% processing fee
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Full payment card -->
          <tr>
            <td class="content-side-padding" style="padding:0 28px 24px; background-color:#F8FCFD;">

              <table
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="width:100%; background-color:#ffffff; border:1px solid #D9EDF5; border-radius:20px; border-collapse:separate;"
              >
                <tr>
                  <td class="card-padding" style="padding:32px 28px;">

                    <p
                      style="margin:0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.4; font-weight:800; letter-spacing:1.5px; color:#0087BD;"
                    >
                      OPTION TWO
                    </p>

                    <h2
                      class="card-title" style="margin:12px 0 0; padding:0; font-family:Georgia,'Times New Roman',serif; font-size:36px; line-height:1.12; font-weight:700; color:#111827;"
                    >
                      Pay In Full
                    </h2>

                    <p
                      style="margin:16px 0 0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:1.6; color:#3F5663;"
                    >
                      Pay the full balance today and you’re all set.
                    </p>

                    

                    <table
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width:100%; margin-top:26px; border-collapse:separate;"
                    >
                      <tr>
                        <td
                          align="center"
                          style="background-color:#0087BD; border-radius:13px;"
                        >
                          <a
                            class="payment-button"
                            href="https://monzo.com/pay/r/broskii-ltd_296grhUHETMPph"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="display:block; padding:19px 18px; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:1.2; font-weight:800; color:#ffffff; text-decoration:none; border-radius:13px;"
                          >
                            BANK TRANSFER — £1,299
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p
                      style="margin:9px 0 0; padding:0; text-align:center; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.5; font-weight:700; color:#0087BD;"
                    >
                      No payment fee
                    </p>

                    <table
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width:100%; margin-top:18px; border-collapse:separate;"
                    >
                      <tr>
                        <td
                          align="center"
                          style="background-color:#111827; border-radius:13px;"
                        >
                          <a
                            class="payment-button"
                            href="https://monzo.com/pay/r/broskii-ltd_my9y1533M5kpBS"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="display:block; padding:19px 18px; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:1.2; font-weight:800; color:#ffffff; text-decoration:none; border-radius:13px;"
                          >
                            CARD PAYMENT — £1,325
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p
                      style="margin:9px 0 0; padding:0; text-align:center; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.5; color:#526875;"
                    >
                      Includes 2% processing fee
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- International travellers -->
          <tr>
            <td class="content-side-padding" style="padding:0 28px 24px; background-color:#F8FCFD;">

              <table
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="width:100%; background-color:#EAF7FB; border-radius:16px; border-collapse:separate;"
              >
                <tr>
                  <td style="padding:24px;">

                    <p
                      style="margin:0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:1.4; font-weight:800; letter-spacing:1px; color:#0087BD;"
                    >
                      TRAVELLING FROM OUTSIDE THE UK?
                    </p>

                    <p
                      style="margin:10px 0 0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:1.6; color:#243c47;"
                    >
                      Can’t use the payment links? Just reply to this email and we’ll arrange an alternative payment method.
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- What’s next? -->
          <tr>
            <td
              align="center"
              style="padding:54px 28px 30px; background-color:#ffffff;"
            >

              <h2
                class="section-title" style="margin:0; padding:0; font-family:Georgia,'Times New Roman',serif; font-size:38px; line-height:1.14; font-weight:700; color:#111827;"
              >
                What’s next?
              </h2>

            </td>
          </tr>

          <!-- WhatsApp card -->
          <tr>
            <td class="content-side-padding" style="padding:0 28px 16px;">

              <table
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="width:100%; background-color:#F5FAFC; border-radius:18px; border-collapse:separate;"
              >
                <tr>
                  <td class="card-padding" style="padding:26px 24px;">

                    <p
                      style="margin:0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.4; font-weight:800; letter-spacing:1.5px; color:#0087BD;"
                    >
                      STAY CONNECTED
                    </p>

                    <h3
                      style="margin:10px 0 0; padding:0; font-family:Georgia,'Times New Roman',serif; font-size:25px; line-height:1.2; font-weight:700; color:#111827;"
                    >
                      WhatsApp Group
                    </h3>

                    <p
                      style="margin:10px 0 0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:1.6; color:#526875;"
                    >
                      2–4 weeks before departure, you’ll be added to your Trip WhatsApp Group, where we’ll share updates, reminders and important trip information.
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Information pack card -->
          <tr>
            <td class="content-side-padding" style="padding:0 28px 16px;">

              <table
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="width:100%; background-color:#F5FAFC; border-radius:18px; border-collapse:separate;"
              >
                <tr>
                  <td class="card-padding" style="padding:26px 24px;">

                    <p
                      style="margin:0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.4; font-weight:800; letter-spacing:1.5px; color:#0087BD;"
                    >
                      EVERYTHING YOU NEED
                    </p>

                    <h3
                      style="margin:10px 0 0; padding:0; font-family:Georgia,'Times New Roman',serif; font-size:25px; line-height:1.2; font-weight:700; color:#111827;"
                    >
                      Information Pack
                    </h3>

                    <p
                      style="margin:10px 0 0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:1.6; color:#526875;"
                    >
                    2–4 weeks before departure, you’ll receive your Trip Information Pack with everything you need before you travel, including flights, transfers, lift passes, optional lessons and packing guidance.
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td
              align="center"
              style="padding:52px 28px 54px; background-color:#ffffff;"
            >

              <p
                style="margin:0 auto; padding:0; max-width:550px; font-family:Arial,Helvetica,sans-serif; font-size:18px; line-height:1.65; color:#526875;"
              >
                Questions? Just reply to this email or message us on WhatsApp.
              </p>

              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                align="center"
                style="margin:28px auto 0; border-collapse:separate;"
              >
                <tr>
                  <td
                    align="center"
                    style="background-color:#0087BD; border-radius:13px;"
                  >
                    <a
                      href="https://wa.me/447749939192"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="display:inline-block; padding:18px 30px; font-family:Arial,Helvetica,sans-serif; font-size:17px; line-height:1.2; font-weight:800; color:#ffffff; text-decoration:none; border-radius:13px;"
                    >
                      MESSAGE US ON WHATSAPP
                    </a>
                  </td>
                </tr>
              </table>

              <p
                style="margin:28px 0 0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:17px; line-height:1.6; color:#3F5663;"
              >
                We look forward to having you with us,<br />
                <strong style="color:#111827;">Broskii</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="padding:28px 22px; background-color:#B9E3F2;"
            >

              <img
                src="https://res.cloudinary.com/dtx0og5tm/image/upload/v1767127511/broskii-logo-email-header_fknl2k.png"
                alt="Broskii"
                width="70"
                style="display:block; width:70px; max-width:70px; height:auto; margin:0 auto 18px; border:0; outline:none; text-decoration:none;"
              />

              <p
                style="margin:0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.8; font-weight:700; color:#243c47;"
              >
                <a
                  href="https://www.broskii.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color:#243c47; text-decoration:underline;"
                >
                  www.broskii.com
                </a>
                <br />

                <a
                  href="mailto:salaam@broskii.com"
                  style="color:#243c47; text-decoration:underline;"
                >
                  salaam@broskii.com
                </a>

                &nbsp;·&nbsp;

                <a
                  href="https://wa.me/447749939192"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color:#243c47; text-decoration:underline;"
                >
                  WhatsApp
                </a>
              </p>

              <p
                style="margin:12px 0 0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.8; color:#243c47;"
              >
                <a
                  href="https://www.instagram.com/broskiiuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color:#243c47; text-decoration:underline;"
                >
                  Instagram
                </a>

                &nbsp;·&nbsp;

                <a
                  href="https://www.tiktok.com/@broskiiuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color:#243c47; text-decoration:underline;"
                >
                  TikTok
                </a>

                &nbsp;·&nbsp;

                <a
                  href="https://www.youtube.com/@broskiiuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color:#243c47; text-decoration:underline;"
                >
                  YouTube
                </a>
              </p>

              <p
                style="margin:14px 0 0; padding:0; font-family:Arial,Helvetica,sans-serif; font-size:11px; line-height:1.5; color:#334e59;"
              >
                © 2026 Broskii. All rights reserved.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    /* ================= ADMIN EMAIL (UNCHANGED) ================= */

    await resend.emails.send({
      from: 'Broskii <info@broskii.com>',
      to: ['salaam@broskii.com'],
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
        <p style="font-size:12px; color:#666;">Full data also stored in Supabase.</p>
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
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message,
      }),
    };
  }
};