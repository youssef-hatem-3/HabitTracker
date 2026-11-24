Habit Flow is a React Native habit tracker organized with a feature-based architecture.

The shared theme in `src/theme` follows the HabitFlow Monthly Plans Redesign
Stitch design system (project `12158965502173323158`). Plus Jakarta Sans
(Regular, SemiBold, Bold) and Inter (Regular, SemiBold) static fonts are bundled
for both platforms; the SIL Open Font License files are kept beside the theme.
Android resolves `700` through `PlusJakartaSans_bold.ttf` and `600` through
dedicated SemiBold family names. `textSecondary` is darker than the design's
muted swatch so normal text meets 4.5:1 contrast on screen and card surfaces.
The sample screen in `AppNavigator` uses a safe area and scrolls when system
text scaling needs more room.

Reusable NativeWind controls live in `src/components/ui`, with `HabitCard` in
`src/features/habits/components`. See the [component API and examples](src/components/ui/README.md).
These components use Stitch's original muted swatch, radius overrides, and
Material Symbols. Metro uses a 16px root to match the Stitch source dimensions.

## Project structure

```text
src/
├── components/ui/       # Reusable presentational components
├── features/            # Feature-owned screens, state, and components
│   ├── habits/
│   ├── monthly-plans/
│   ├── calendar/
│   ├── analytics/
│   ├── onboarding/
│   └── settings/
├── navigation/          # App-level navigation boundary
├── theme/               # Shared design tokens
├── storage/             # Persistent-data adapters
├── hooks/               # Shared React hooks
├── types/               # Shared TypeScript types
└── utils/               # Framework-independent helpers
```

Feature code should stay within its own directory unless it is genuinely shared. Shared UI stays in `components/ui`; cross-feature coordination belongs at the navigation or app level.

## Import and data ownership conventions

- Use `@/…` for imports that cross a module boundary, for example `@/theme` or `@/features/habits`.
- Use relative imports only within the same feature or module. Do not reach into another feature's internal files.
- Every reusable module exposes its public API from its `index.ts`. ESLint rejects deep alias imports into features and shared UI.
- Shared domain models live once in `src/types`. The initial habit models are exported from `@/types` for habits, calendar, and analytics to reuse.
- Monthly plans, daily schedules, and dated habit definitions follow the [domain model rules and example](src/types/README.md).
- Persistent habit data has one boundary: `HabitRepository` in `@/storage`. Features may derive or cache view state, but do not maintain competing persisted copies.

## Getting Started

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
