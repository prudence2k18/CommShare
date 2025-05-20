<!-- HomeScreen-> Listed estates that the user has been added to. -->
<!-- tailwind -->
At the top, a profile pic and name to the left, full transaction list icon to the right.

Status report next with total transactions and amount spent.

Menu contains created estates where you can create more.

2nd menu estates that they have been added to with the number of estates they have been added to with the text estates you have been added to then an icon with the number, under click to view estate(s) youve been added to.

Dashboard whith recent 3 transctions last on the list.



1.  This is a home screen for an app where users join estate groups of estates they live in and make transactions
    to pay for servces relating to the estate.
    First rules are, get your colours, fonts, sizes, etc form this theme file eg Theme.colors.primary.
    Import for the theme file is this: import { Theme } from "../Components/Theme";
    Black and white colors eg #fff, #f8f8f8, #000 can be used even if not in the theme file.
    Images are gotten from a uri.
    Use font awsome svg and react native icons.
    The overall vibe im going for is a finance app.

    The top part of the screen will contain the following:
    At the top left of the screen a profile picture with Hello "username" to the right of it.
    At the top right a touchable list icon. Do not use shadows.

    The next part will be a status report with the total numer of transactions made and total amount spent. Do not use shadows.

    The next part is for when clicked will take you to a page where the users created estate are, it should have a smaller text below the main text saying "click to manage or create estate groups", the create estate page has already been created by me. Do not use shadows.

    The next part under says "estates you have been added to" then the number displayed after, under in a smaller text says "click to view". Do not use shadows.

    After that the last part is a vertical flat list with the last three recent transactions made, the three transactions are gotten from a const recentTransactions = []; made earlier in the code.

    This is a react native app.
