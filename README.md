# 🛒 DevMart

DevMart is a React Native e-commerce platform with Firebase Authentication, multilingual support, and country-based dynamic configuration.

---

## 📦 Installation

```bash
https://github.com/IAmRahul123/WU-Compact.git
cd WU-Compact
yarn install
```

---

## 🌍 Language & Country Configuration

DevMart supports building the app for specific **countries** and **languages**.

### Language Support

- Uses [`i18next`](https://www.i18next.com/) with `react-i18next`.
- Language files are stored in the project and automatically loaded.
- On the first app launch, a language selection screen is shown.

### Country-based Setup

Before running the app, generate a country-specific config file using:

```bash
yarn setup-uat
```

This runs:

```bash
cross-env gulp prepare-config --env=UAT --country=IN
```

- This will merge and generate a country + environment config file.
- The config file is then used throughout the app.

You can modify the environment and country by replacing `UAT` and `IN`.

---

## 🧪 Running the App

```bash
yarn android     # For Android
yarn ios         # For iOS (macOS only)
```

Make sure to run the `setup-uat` or your respective setup script before launching the app.

---

## 🧪 Running Tests

```bash
yarn test
```

You can also run:

```bash
yarn test:coverage   # For coverage report
```

---

## 🐛 Debugging Tools

- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com/) for inspecting network, Redux state, logs, etc.

Ensure both are installed for optimal dev experience.

---

## 🧹 Code Quality

- **TypeScript** used across the project.
- **ESLint** for linting and **Prettier** for formatting.
- **Husky** pre-commit hooks auto-run lint + format checks before allowing commits.

To manually lint and format:

```bash
yarn lint
yarn format
```

If Husky isn't installed (after fresh clone):

```bash
yarn prepare
```

---

### Manual Deployment

---

#### Android Deployment (Manual)

1. **Generate Signed APK**

   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. **Locate APK**
   The generated APK file will be available at:

   ```bash
   android/app/build/outputs/apk/release/app-release.apk
   ```

3. **Google Play Console**
   - Go to [Google Play Console](https://play.google.com/console/).
   - Sign in with your developer account.
   - Click **Create App** (if not already created).
     - Fill in app name, default language, app or game, free or paid.
     - Accept declarations.
   - Go to **Release > Production > Create New Release**.
   - Choose **Google Play App Signing**.
   - Upload the `app-release.apk`.
   - Add release name and release notes.
   - Review and roll out to production.

---

#### iOS Deployment (Manual)

1. **Open Xcode Project**

   - Navigate to `ios/` folder.
   - Open `YourApp.xcworkspace` with Xcode.

2. **Setup Team and Bundle ID**

   - Select your target in the project navigator.
   - Go to **Signing & Capabilities** tab.
   - Add your Apple Developer Team and unique Bundle Identifier.

3. **Archive the App**

   - In Xcode, go to **Product > Archive**.
   - Wait for Xcode to build and open the Organizer.

4. **Upload to App Store**

   - In the Organizer window, select the latest archive.
   - Click **Distribute App** > **App Store Connect** > **Upload**.
   - Follow the prompts and sign with your distribution certificate.

5. **App Store Connect**
   - Go to [App Store Connect](https://appstoreconnect.apple.com/).
   - Create a new app (if needed), entering:
     - Name, Primary Language, Bundle ID, SKU.
   - Go to **TestFlight** to test or **Prepare for Submission**.
   - Fill in screenshots, description, keywords, support URL, etc.
   - Submit for review and wait for approval.

---

Ensure all steps are completed with the correct credentials and provisioning profiles. Screenshots, app info, and metadata are required during submission.

---

## 🧠 Notes

- Environment variables are managed manually via config, no `.env` setup is used.
- Patch files are handled using `patch-package` (runs postinstall).

---

## 👥 Author

**Aditya Ranjan Gudu**  
_Lead Developer – DevMart_
