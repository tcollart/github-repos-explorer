# GitHub repos explorer

This project is a simple example to showcase how to fetch an API and display the results in a ListView then in a DetailsView with [react-native](https://github.com/facebook/react-native).

The app is currently working only on Android.

## Android
In the root directory
- Install dependencies: `npm install`
- You might need to run adb reverse to run the app on a physical device: `adb reverse tcp:8081 tcp:8081`
- Run the project: `react-native run-android`

## Future improvements:
- [ ] Handle backbutton
- [ ] Use an [Alert](https://facebook.github.io/react-native/docs/alert.html) if no internet connection
- [ ] Enhance style
- [ ] Code refactoring
