//Save Settings
//payload => id, token, settings
// app.post('/savesettings', (request, response) => {
//     const payload = payloadDecoder(request.body.payload);

//     jwt.verify(payload.token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
//         try {
//             if (!err && decoded.id === payload.id) {
//                 const saveSettings = await User.findOneAndUpdate(
//                     { _id: payload.id },
//                     { $set: { settings: payload.settings } }
//                 );

//                 return response.json({ save: true });
//             }

//             throw new Error('Save Failed');
//         } catch (error) {
//             response.json({ save: false, error: error.message });
//         }
//     });
// });

//verify user token
//query => token
// app.get('/verify', (request, response) => {
//     jwt.verify(request.query.token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
//         try {
//             if (!err) {
//                 const user = await User.findOne({ email: decoded.email });

//                 if (user) {
//                     const { id, name, surname, email, settings } = user;

//                     return response.json({ valid: true, user: { id, name, surname, email, settings } });
//                 }
//             }

//             throw new Error('Invalid Token');
//         } catch (error) {
//             response.json({ valid: false, error: error.message });
//         }
//     });
// });

//Login
//payload => email, password
// app.post('/login', async (request, response) => {
//     try {
//         const payload = payloadDecoder(request.body.payload);
//         const email = payload.email.toLowerCase();
//         const user = await User.findOne({ email });

//         if (user) {
//             const isPasswordCompare = await argon2.verify(user.password, payload.password);

//             if (isPasswordCompare) {
//                 const { id, name, surname, email, settings } = user;
//                 const token = jwt.sign({ id, email, name, surname }, process.env.JWT_SECRET_KEY, {
//                     expiresIn: '24h',
//                 });

//                 return response.json({ login: true, user: { id, name, surname, email, token, settings } });
//             }
//         }

//         throw new Error('Wrong Email or Password');
//     } catch (error) {
//         response.json({ login: false, error: error.message });
//     }
// });
