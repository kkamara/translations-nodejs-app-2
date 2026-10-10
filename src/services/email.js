"use strict";
const nodemailer = require("nodemailer");
const path = require("node:path");
const pug = require("pug");
const config = require("../config/index");

/**
 * @param {Object} obj
 * @param {string} obj.subject
 * @param {string} obj.plainText
 * @param {string} obj.html
 * @param {string} obj.message
 * @returns {boolean}
 */
exports.testSendEmail = async ({
  subject,
  plainText,
  html,
  message,
  to,
}) => {
  const transporter = nodemailer.createTransport({
    host: "mailhog", // Docker app
    port: config.forwardingMailhogPort || 1025,
    secure: false, // true for 465, false for other ports
  });
  try {
    await transporter.sendMail({
      from: config.mailFrom,
      to: to || config.mailTo,
      subject: subject || "Hello ✔",
      text: plainText || pug.renderFile(
        path.join(__dirname, "../views/emails/test-email.text"),
        {
          message: message || "Hello world",
          appName: config.appName,
          footerYear: 2027,
        },
      ),
      html: html || pug.renderFile(
        path.join(__dirname, "../views/emails/test-email.pug"),
        {
          message: message || "Hello world",
          appName: config.appName,
          footerYear: 2027,
        },
      ),
    });

    return true;
  } catch (err) {
    if ("production" !== config.nodeEnv) {
      console.log(err);
    }
    return false;
  }
};