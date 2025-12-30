import React from "react";

export default function Map() {
  return (
    <div className="w-full">
      <iframe
       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4191.860403867648!2d-95.08306272390251!3d29.491043844577543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864082b89efd7d85%3A0x1de821744e564cb2!2s1609%201%2F2%20State%20Hwy%203%2C%20League%20City%2C%20TX%2077573%2C%20USA!5e1!3m2!1sen!2sbd!4v1761031616685!5m2!1sen!2sbd"
        width="100%"
        height={400}
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}


