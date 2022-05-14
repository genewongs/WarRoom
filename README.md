# WarRoom

## Introduction
War Room is a multi-user interactive board game visualizer that integrates live chat, auto batttle, customized monster creation feature, providing an online space for friends to hang out.

## Installation
This application is run based on Node.js. To intsall, run

`
 npm install
`
To start the webpack, run

`
npm run build
`

start the server, run

`
npm start
`

Go to your localhost:3000 and start using WarRoom.

## Components

The application contains a myriad of components that work together in unison to contribute to the overall functionality of the application.

### Sign in
The user can register an account if being to the game for the first time or sign in with an existing account. User is required to fill in all the required fields before clicking the sign up/sign in button. After user signs in, page will be redirected to the main room and user can start playing the game.

![ezgif com-gif-maker](https://user-images.githubusercontent.com/81209759/168443727-3cc02b59-d30e-4f8d-8c15-67af5803f6b2.gif)

### Board

The user may select an arbitrary n x n board size. During development, the application was most commonly tested with a 6x6 board size. If it is the user's turn, they may place any monster that is currently in the off-board section of their monster list onto the board may dragging that monster's icon or card from the monster list directly on to the board. When the monster is dropped onto the board, ownership of that particular monster will be signified by a change in the border color of that monster's icon, which will change from gold to whatever specific color has been assigned to the user (visible next to the heading "On Board" on the top left).

Assuming that it is the user's turn, they may moving any on-board user to any tile on the board. The user may also choose to attack monsters owned by another player my clicking on their own monster. The border color of the selected monster will then change, and the user should click on the enemy monster that they wish to attack next. An attack card should pop up next to where the user has clicked showing the attacks available, along with various stats. The user can then choose a specific attack by clicking on the name of an attack, and confirm their selection by clicking on the "Attack" button, which should change to a red color to signify to the user that the application is ready for their final attack decision.

Once the attack has been completed, there should be one or several messages appearing in the battle event log section of the application, showing whether the attack was successful. Additionally, the enemy monster will fade from view if it has been vanquished by the user's own monster.

### Live Information

Elliot Langdon has designed the live information sections shown on the right side of the application. This section includes two sub-sections: (1) Battle Chat; and (2) Battle Log.
#### Battle Chat

To the top right of the application is a battle chat window in which the user may view messages that they as well as other users in the same battle room have written. The messages are distinguished by different colors as well text alignment. The user's own messages are aligned to the right, in conformity with what is commonly seen in text message applications on mobile phones. The other users' messages will be aligned to the left. A time stamp is also included in the battle chat.

Chat messages are not stored anywhere in a central database and are simply epehemeral data objects sent via socket connection amongst any users connected to the same room.

![ezgif com-gif-maker](https://user-images.githubusercontent.com/81209759/168444335-14ea3013-2881-4917-9ba7-5294e7500853.gif)


#### Battle Log

The battle events log component of the app will display battle events that have transpired on the board, i.e., the results of various users' attacks. The text description of events are enclosed in colored bubbles, with different colored bubbles implying different results. A successful attack will be green in color, while an unsuccessful attack will be gray in color. If the user's attack is so successful that they are able to vanquish the enemy monster, the enemy's monster will not only fade from view on the board but also produce a red event bubble on the Battle Events log.
### Monster List

The monster list component consists of three sub-components: list, create, and details.

#### List

The list section will show which of the user's monsters are on the board and which of the user's monsters are off the board. There is also a color indicator next to the "On Board" heading showing which color belongs to the user. This color should be consistent with the border colors on the monster icons on the board as well as the turn indicator text shown at the very bottom of the screen.

#### Create

The create section will allows the user to create a new monster. The user may choose an avatar for the monster from a predetermined set of icons and add an arbitrarily large number of attacks. The user may also specify that multiples of the monster should be created.
#### Details

The details section is triggered when the user clicks on a specific monster's card in the list section of the application. Whereas the list section will only show the monster's name, health, armor, and movement, the details section shows those plus all other relevant details including: description, attacks, attack stats. There is also the option to delete a monster from the user's bestiary if the user so desires.

The fields on the detail page become editable
## Team
* Project Manager: Dora Xia
* UI Owner: Gene Wong
* Backend Architect: Alex Shiao
* Software Engineer: Adarsh Ravindra
* Software Engineer: Elbert Chan
* Software Engineer: Elliot Landon
* Software Engineer: David Estephanian

## Technologies

* React 17
* Firebase 9
* Socket.io 4
* Babel 7
* Webpack 5
