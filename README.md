# SafeWalk
## Summary && Inspiration
The following app is designed to be used when feeling unsafe walking home alone. The user can pretend to talk on the phone to the app while walking home. The app is used to log users location if a keyword is spoken. Authorities can find and track those in trouble through the same app. It is an alternative to the security measures like this:

![Alt text](Images/emergency.jpeg?raw=true "Emergency Phone Meme")

--- 

## Usage
| Description | Image |
| --- | --- | 
| - User can select to start walk by pressing the 'Start Walk' or see people who are in danger by pressing 'See Map'. <br> <br> - 'Start Walk' requires users to enter a keyword and name. The keyword is used for the app to enter danger mode when it is spoken. The name is used to distinguish users. <br> <br> - 'See Map' requires users to enter a name to distinguish users from each other.    | ![Alt text](Images/HomeScreen.png?raw=true "Home Screen") |
| - If 'See Map' is selected, the user can see those in danger in her area. <br> <br> - Once the user taps on a walker, they can choose to track walker and potentially find her by cliking the pop up. <br> <br> - Once the user decides to track the walker, the user will pop up on the walker's map.   | ![Alt text](Images/DangerMapSelected.png?raw=true "Tracking Map") |
| - If 'Start walk' is selected and keyword is spoken, the user will see the map of her area. <br> <br> - Once a helper decides to track the user, the helper will show up on the walker's map. <br> <br> - If the user feels safe, she can stop broadcating her location to potential helpers by pressing "I am safe" | ![Alt text](Images/DangerMap.png?raw=true "Danger Map") |

---
## Tools and Resources

### Tools:
- react-native
- react-native-maps
- react-native-community/geolocation
- react-native-voice

### Resources:
- Medium's article on using react-native-voice <https://medium.com/jeremy-gottfrieds-tech-blog/tutorial-react-native-speech-recognition-d9ae54960565>

---
## Improvements and Future
- The app now only works on ios phones. Expanding it to work with androids would be ideal in the future
- The voice recognition works by testing the last word spoken to the keyword. This could lead to errors if the last word is initially miscalculated and recalculated later. Testing the whole sequence for the keyword would be better.
- This app has not been tested on real phones. It would be great to test it once I get an Apple Developer's account

