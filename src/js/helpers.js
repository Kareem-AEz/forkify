import { TIMEOUT_SEC } from './config';

const timeout = seconds =>
  new Promise((_, reject) =>
    setTimeout(() => {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`)
      );
    }, seconds * 1000)
  );

export const AJAX = async (url, uploadData = undefined) => {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}: ${res.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJson = async url => {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}: ${res.status}`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const postJson = async (url, uploadData) => {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message}: ${res.status}`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
