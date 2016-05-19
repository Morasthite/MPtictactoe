/**  Created by Qzxtzrtz on 5/3/2016. */

//TODO ***************************** GLOBAL VARIABLES  *******************************//

var player1_name_value;
var player2_name_value;
var num_of_rows = 3;
var num_of_cells_to_win = 3;
var theme_value = "auto_shop";
//var background_value = "background_sound_auto_shop";
var player_symbol = 'ex';
var grid_array = [];
var last_clicked;
var game_won = false;
var last_data;
var game_board_grid=[];
var clicked_cells_count = 0;
var game_score_player_1_wins = 0;
var game_score_player_2_wins = 0;
var game_score_draw = 0;

//TODO **************************  LOCAL STORAGE   *******************************/

function local_storage_restore() {
    var contents_last_game = JSON.parse(localStorage.getItem("storeKey"));
    return contents_last_game;
}//end local_storage_restore

function restore_last_game_board (last_data) {
    ///////////if local storage is not empty
    if (last_data!="") {
        player1_name_value = last_data.player1_name_value;
        player2_name_value= last_data.player2_name_value;
        player_symbol= last_data.player_symbol;
        num_of_rows= last_data.num_of_rows;
        num_of_cells_to_win= last_data.num_of_cells_to_win;
        grid_array=last_data.grid_array;
        last_clicked= last_data.last_clicked;
        game_won= last_data.game_won;
        $(".game_board").empty();
        game_board_grid=[];
        game_board_creation();
        theme_value = last_data.theme_value;
        theme_background_sound_play(theme_value);
        theme_click_sound_controls(theme_value);
        theme_background_changer(theme_value);
        for (var i=0;i<num_of_rows;i++) {
            for (var j=0;j<num_of_rows;j++) {
                if (grid_array[i][j]!=0) {
                    game_board_grid[i][j].html.addClass(grid_array[i][j]+" clicked");
                    theme_ex_changer(theme_value);
                    theme_ow_changer(theme_value);
                }////end of if
            }////end of for j
        }////end of for i
        // click_player1_name();
        // click_player2_name();
    }
}

function store_essential_data () {
    var stored_data = {
        theme_value: theme_value,
        player1_name_value: player1_name_value,
        player2_name_value: player2_name_value,
        player_symbol: player_symbol,
        num_of_rows: num_of_rows,
        num_of_cells_to_win: num_of_cells_to_win,
        grid_array: grid_array,
        last_clicked: last_clicked,
        game_won: game_won
    };
    var data = JSON.stringify(stored_data);
    window.localStorage.setItem('storeKey',data);
}//end store_ess

//TODO ***************************** ANIMATION  *******************************//

function animate_winner_name () {
    if(player_symbol == 'ex') {
        $(".player2").removeClass("player");
        $('.player2').addClass('animate, winner2');//, player2-wins');
        $('.player2').append("<p class='wins'> WhooHoo!</p>");
        $('.player2').append("<p class='wins'> Alright!</p>");
        $('.player1').append("<p class='wins'> Hire Me!</p>");
        $('.player2').append("<p class='wins'> Yeah...Boy!</p>");
        $('.player2').append("<p class='wins'> Great Job!</p>");
        $('.player2').append("<p class='wins'> Steve Jobs!</p>");
        $('.player2').append("<p class='wins'> Take that!</p>");
        $('.player2').append("<p class='wins'> Wins!</p>");
        $('.player1').append("<p class='wins'> Don't let go, Jack!</p>");
        $('.player1').removeClass('animate');
        //$(".animate.winner").append("congratulations");
    }//end if
    else {
        $(".player1").removeClass("player");
        $('.player1').addClass('animate, winner');//, player1-wins');
        $('.player1').append("<p class='wins'> Yeehhawww!</p>");
        $('.player1').append("<p class='wins'> Dan was slapped, take that!</p>");
        $('.player1').append("<p class='wins'> Alright!</p>");
        $('.player1').append("<p class='wins'> OMG LUCKY!</p>");
        $('.player1').append("<p class='wins'> Hire Me!</p>");
        $('.player1').append("<p class='wins'> Great Job!</p>");
        $('.player1').append("<p class='wins'> Wins!</p>");
        $('.player1').append("<p class='wins'> It's about time!</p>");
        $('.player1').append("<p class='wins'> Nice Win!</p>");

        $('.player2').removeClass('animate');
    }//end else
    setTimeout(function(){
        $('.wins').remove();
    },10000);
    //$(' Wins').remove();
}//end of animate_name function $(".appended.animate.winner").html(<h3>Congratulations</h3>);

// Player name animation function
function animate_name () {
    if(player_symbol === 'ex') {             //if current player is ex, animate
        $('#player_one').addClass('animate');
        $('#player_two').removeClass('animate');
    }//end if
    else {                                   //else, animate other player
        $('#player_two').addClass('animate');
        $('#player_one').removeClass('animate');
    }//end else
}//end of animate_name function

//TODO ***************************** INPUT CAPTURES  *******************************//

function modalSubmition() {
    game_won= false;
    //////getting players names
    player1_name_value = $("#player1").val();
    player2_name_value = $("#player2").val();
    $("#player_one").text(player1_name_value);
    $("#player_two").text(player2_name_value);
    $("#vs").text("vs");
    animate_name();
    ///////getting num of rows
    var row_num = $('.number_of_rows').val();
    if (row_num != "") {
        num_of_rows = $('.number_of_rows').val();
        num_of_rows = parseInt(num_of_rows);                    //converts value to number and store
        //call game board creation
        $(".game_board").empty();                         //empty game board, else, new board created will have old game
        grid_array = [];                                  //clear grid
        create_grid_array();                              //recreate grid
        game_board_creation();                            //create game board
    }//////////end of if to check if the user has new num of row
    ///////////////////getting num of cells to win
    num_of_cells_to_win = $('.number_of_matches').val();
    console.log('num_of_cells_to_win = ' + num_of_cells_to_win);
    num_of_cells_to_win = parseInt(num_of_cells_to_win);
    if(num_of_cells_to_win <= num_of_rows) {
        $(".game_board").empty();
        grid_array = [];
        create_grid_array();
        game_board_creation();
    }
    else {
        alert("Number of matches must be > or = number of rows currently on the board, Duh!!");
    }
    ////checks if non of the player names are entered, it won't show vs as well
       if (player1_name_value != "" && player2_name_value != "") {
              $("#vs").text("vs");
           }
       else{
              $("#vs").text("");
           }
    /////////////getting theme
    theme_background_sound_pause (theme_value);
    //capture theme, store as var
    theme_value = $(".theme_picker_select").val();
    console.log('theme picked = theme_value, is : ' + theme_value);
    $(".game_board").empty();
    grid_array = [];
    create_grid_array();
    game_board_creation();
    theme_background_changer(theme_value);
    theme_ex_changer(theme_value);
    theme_ow_changer(theme_value);
    theme_font_changer(theme_value);
    theme_background_sound_play (theme_value);

}///////////end of modal submition

//TODO ***************************** SOUND CONTROL *******************************

function theme_background_sound_play (theme_value){
    var starwars_background_sound = document.getElementById('starwars-background-sound');
    var desert_background_sound = document.getElementById('desert-background-sound');
    var beach_background_sound = document.getElementById('beach-background-sound');
    var girlfight_background_sound = document.getElementById('girlfight-background-sound');
    var auto_shop_background_sound = document.getElementById('auto_shop_background_sound');
    var classroom_background_sound = document.getElementById('classroom-background-sound');
    switch(theme_value){
        case "auto_shop":
            auto_shop_background_sound.play();
            auto_shop_background_sound.loop = true;
            break;
        case "star_wars":
            starwars_background_sound.play();
            starwars_background_sound.loop = true;
            break;
        case "desert_warfare":
            desert_background_sound.play();
            desert_background_sound.loop = true;
            break;
        case "big_toe":
            beach_background_sound.play();
            beach_background_sound.loop = true;
            break;
        case "girl_fight":
            girlfight_background_sound.play();
            girlfight_background_sound.loop = true;
            break;
        case "class_room":
            classroom_background_sound.play();
            classroom_background_sound.loop = true;
            break;
        default: return;
    }//end switch
}//end theme_background_sound_play function

function theme_background_sound_pause (theme_value){
    var starwars_background_sound = document.getElementById('starwars-background-sound');
    var desert_background_sound = document.getElementById('desert-background-sound');
    var beach_background_sound = document.getElementById('beach-background-sound');
    var girlfight_background_sound = document.getElementById('girlfight-background-sound');
    var background_sound_auto_shop = document.getElementById('auto_shop_background_sound');
    var classroom_background_sound = document.getElementById('classroom-background-sound');
    switch(theme_value){
        case "auto_shop":
            background_sound_auto_shop.pause();
            break;
        case "star_wars":
            starwars_background_sound.pause();
            break;
        case "desert_warfare":
            desert_background_sound.pause();
            break;
        case "big_toe":
            beach_background_sound.pause();
            break;
        case "girl_fight":
            girlfight_background_sound.pause();
            break;
        case "class_room":
            classroom_background_sound.pause();
            break;
        default: return;
    }//end switch
}//end theme_background_sound_pause function

function theme_background_sound_pause_initiator(){
    theme_background_sound_pause(theme_value);
}// needed to call theme background sound pause from doc.ready

function theme_click_sound_controls (theme_value){
    switch(theme_value){
        case "auto_shop":
            cell_click_sound_control("click_sound_auto_shop");
            break;
        case "star_wars":
            cell_click_sound_control("click-sound-starwars");
            break;
        case "desert_warfare":
            cell_click_sound_control("click-sound-desert");
            break;
        case "big_toe":
            cell_click_sound_control("click-sound-beach");
            break;
        case "girl_fight":
            cell_click_sound_control("click-sound-girlfight");
            break;
        case "class_room":
            cell_click_sound_control("click-sound-classroom");
            break;
        default: return;
    }//end switch
}//end theme_click_sound_controls function

function cell_click_sound_control(click_sound_id){
    var clicksound = document.getElementById(click_sound_id);
    clicksound.play();
}//end cell_click_sound function

// function intro_sound_play(){
//     var intro_sound = document.getElementById("intro-sound");
//     intro_sound.play();
//     intro_sound.loop = true;
// }//end intro_sound_control function
//
// function intro_sound_pause(){1
//     var intro_sound = document.getElementById("intro-sound");
//     intro_sound.pause();
//     $(".shutup-barney-button").hide();
// }//end intro_sound_control function

function applause_winner(){
    var applause_winner_sound = document.getElementById("game-won-sound");
    applause_winner_sound.play();
}//end applause winner function

function button_click_sound(){
    var button_click_sound = document.getElementById('button-click-sound');
    button_click_sound.play();
}//end button click sound function

// TODO ******************** THEME BACKGROUND AND CLICK APPEARANCE CHANGER*************//

function theme_background_changer(theme_value){  //take input: theme_value and changes background image & ex+ow images
    //change background
    switch(theme_value) {
        case "auto_shop":
            $('.wrapper').css("background-image", "url(images/background/auto_shop_background.jpg)");
            break;
        case "star_wars":
            $('.wrapper').css("background-image", "url(images/background/starwars_background.jpg)");
              break;
        case "desert_warfare":
            $('.wrapper').css("background-image", "url(images/background/desert_background.jpg)");
            break;
        case "big_toe":
            $('.wrapper').css("background-image", "url(images/background/beach_background.jpg)");
            break;
        case "girl_fight":
            $('.wrapper').css("background-image", "url(images/background/girlfight_background.jpg)");
            break;
        case "class_room":
            $('.wrapper').css("background-image", "url(images/background/classroom_background.jpg)");
            break;
        default: return;
    }//end switch
}//end theme_picker function

function theme_ex_changer(theme_value){ //take input: theme_value and changes ex images
    switch(theme_value) {
        case "auto_shop":
            $('.ex').css("background-image", "url(images/x/auto_shop_x.png)");
            break;
        case "star_wars":
            $('.ex').css("background-image", "url(images/x/starwars_x.png)");
            break;
        case "desert_warfare":
            $('.ex').css("background-image", "url(images/x/desert_x.png)");
            break;
        case "big_toe":
            $('.ex').css("background-image", "url(images/x/beach_x.png)");
            break;
        case "girl_fight":
            $('.ex').css("background-image", "url(images/x/girlfight_x.png)");
            break;
        case "class_room":
            $('.ex').css("background-image", "url(images/x/classroom_x.png)");
            break;
        default: return; //why staying at background not work, had to switch background-image
    }//end switch
}//end theme_ex_changer function

function theme_ow_changer(theme_value){  //take input: theme_value and changes background image & ex+ow images
    //change background
    switch(theme_value) {
        case "auto_shop":
            $('.ow').css("background-image", "url(images/o/auto_shop_o.png)");
            $('.cell').css("background-color", "rgba(175, 175, 124, 0.2)");
            break;
        case "star_wars":
            $('.ow').css("background-image", " url(images/o/starwars_o.png)");
            $('.cell').css("background-color", "rgba(28, 86, 23, 0.23)");
            break;
        case "desert_warfare":
            $('.ow').css("background-image", " url(images/o/desert_o.png)");
            $('.cell').css("background-color", "rgba(0,0,0,0.2)");
            break;
        case "big_toe":
            $('.ow').css("background-image", " url(images/o/beach_o.png)");
            $('.cell').css("background-color", "rgba(23, 61, 86, 0.23)");
            break;
        case "girl_fight":
            $('.ow').css("background-image", " url(images/o/girlfight_o.png)");
            $('.cell').css("background-color", "rgba(46, 125, 177, 0.23)");
            break;
        case "class_room":
            $('.ow').css("background-image", " url(images/o/classroom_o.png)");
            $('.cell').css("background-color", "rgba(0,0,0,0.2)");
            break;
        default: return;
    }//end switch
}//end theme_picker function

function theme_font_changer(theme_value){
    switch(theme_value) {
        case "class_room":
            $('*').css("font-family", "Arial");
            $(".game_title").html("We Don't Need No <span> Education </span> !!!");
            $(".game_title").css("color", "white");
            break;
        case "star_wars":
            $('*').css("font-family", "Arial");
            $(".game_title").html("STAR TREK  <span> RULES</span> !!!");
            $(".game_title").css("color", "black");
            //$("h4").css("font-size",".8em");
            break;
        case "desert_warfare":
            $('*').css("font-family", "Noto Serif");
            $(".game_title").html("Draw me wearing this, wearing <span> only this</span>");
            //$("h4").css("font-size",".8em");
            break;
        case "big_toe":
            $('*').css("font-family", "Open Sans");
            $(".game_title").html("BIG TOE  <span> DEATH MATCH</span> !!!");
            break;
        case "girl_fight":
            $('*').css("font-family", "GFS Didot, serif");
            $(".game_title").html("YOU, ARE <span> NOT </span> PREPARED !!!");
            //$("h3 span").css("font-size", "1em");
            break;
        case "auto_shop":
            $('*').css("font-family", "Gochi Hand");
            $(".game_title").html("TIC TAC TOE  <span> DEATH MATCH</span> !!!");
            //$("h3 span").css("font-size", "1em");
            break;
        default: return; //why staying at background not work, had to switch background-image
    }//end switch
}//end theme font changer function


//TODO ***************************** BOARD CREATION  SECTION  *******************************//

function game_board_creation () {
    for(var x = 0;x <= num_of_rows-1; x++){
        var inside_array=[];
        for(var y = 0;y <= num_of_rows-1; y++) {
            var new_obj =
            {
                row : x,
                col : y,
                html: $("<div class='cell'></div>"),
                click_handler: function(){                      //this function handles the object when it is clicked
                    var symbol = toggle_and_get_current_symbol();   //retrieves last used, ie. current, symbol
                    if(!this.html.hasClass("clicked")) {
                        grid_array[this.row][this.col]=symbol;          //stores the symbol x or o in the grid array
                        this.html.addClass('clicked ' + symbol);    //sets x or o in the html cell
                        check_the_win (last_clicked.row , last_clicked.col);  //calls win condition check
                        store_essential_data();                               //
                    }///////if the div hasn't been clicked before
                    else {
                        toggle_and_get_current_symbol();
                    }/// end of else
                    animate_name();         //glow current player's name if it is his turn
                    /////******************here**************************************
                    theme_click_sound_controls(theme_value);
                    theme_ex_changer(theme_value);
                    theme_ow_changer(theme_value);
                    /************************Uto the end of here***********************/
                    this.html.addClass('shakes');
                    draw_condition_check();
                }//click handler
            };///new obj
            make_click(new_obj);
            inside_array.push(new_obj);
            $(".game_board").append(new_obj.html);
        }////y
        game_board_grid.push(inside_array);
    }////x
    // width and height of cell
    if ($(window).height()> $(window).width()) {
        var metric = "vw";
    }else {
        var metric = "vh";
    }
    var cell_width = 80/num_of_rows+metric;
    $('.cell').css({"width": cell_width,"height": cell_width});
}//end function game_board_creation

function make_click(the_object){
    the_object.html.click(function(){
        console.log('object that was triggered',the_object);
        if (game_won === false) {                               //if game is not won
            last_clicked = the_object;                          //stores object for win check function
            the_object.click_handler();                         //call click handler method
        }//end if
    });//end .click function
}//end make_click

function toggle_and_get_current_symbol(){
    if(player_symbol=='ex'){
        player_symbol = 'ow';
    }
    else{
        player_symbol = 'ex';
    }
    return player_symbol;
} //end toggle_and_

//TODO **** begin document ready
$(document).ready(function(){
    // //TODO 0.9 click sound for all button clicks/
     $("button, input").click(button_click_sound);
    // //TODO 1. players will enter name into input field + click submit, click function will
    // //Player1-name-value capture
    // $("#player1-name-submit").click(click_player1_name);
    // //Player2-name-value capture
    // $("#player2-name-submit").click(click_player2_name);
    // theme_background_sound_play(theme_value);
    // theme_click_sound_controls(theme_value);
    // theme_background_changer(theme_value);
    theme_background_sound_play (theme_value);
    create_grid_array();
    /////dynamic creation of game board
    game_board_creation();
     //$("#setting_submit").click(modalSubmition);
    // //TODO RESET BUTTON
    $("#reset").click(reset);//end RESET
    //TODO RESTORE BUTTON
    $('#restore').click(function () {
        last_data = local_storage_restore();
        restore_last_game_board(last_data);
    });

});
//TODO **** end document ready

//TODO ***************************** RESET SECTION  *******************************//

function reset() {
    console.log('Begin Reset');                     //reset global variables
    num_of_cells_to_win = 3;
    player_symbol = 'ex';
    last_clicked = null;
    game_won = false;
    clicked_cells_count = 0;
    //theme_background_sound_pause_initiator();   //pause current theme background sound to prevent overlapping of theme sounds when user chooses new one.
    grid_array = [];                            //reset the grid
    create_grid_array();                        //recreate array
    console.log("grid_array is now: "+grid_array);
    $(".game_board").empty();                   //empty game board
    game_board_grid=[];
    game_board_creation();                      //recreate game board
}//end RESET

//TODO *****************************  SECTION - CHECK WIN CONDITIONS *******************************//

function check_the_win (row, col) {
    var row_win = check_row(row);
    console.log("row win: ",row_win);
    if (!row_win) {  // if no match in the row
        var col_win = check_col(col);   //check the col
        console.log("col win", col_win);
    } else {                            // ie. if row win
        game_won = true;
        animate_winner_name ();
        applause_winner();

    }
    if(!row_win && !col_win) {   // if no match in row or column
        var left_right_win =diagonal_check_left_to_right(row,col);  //check diagonal left to right
        console.log("left to right win: ", left_right_win);
    }else {                      // if match in row or column
        game_won = true;
        animate_winner_name ();
        applause_winner();
    }
    if (!row_win && !col_win && !left_right_win) {  //  if no row , column or left to right diagonal matches
        var right_left_win = diagonal_check_right_to_left(row, col);  // check diagonal right to left
        console.log(" right to left win: ", right_left_win);
        /////////if there is a match in the last case
        if (right_left_win) {                   // if right to left match
            game_won = true;
            animate_winner_name ();
            applause_winner();
        }
    }else {
        game_won = true;
        animate_winner_name ();
        applause_winner();
    }
}//check the win

function check_row(row) {
    var match_counter = 0;
    for (var i=0;i<num_of_rows-1;i++){
        if(grid_array[row][i]==grid_array[row][i+1] && grid_array[row][i]!==0){
            match_counter++;
        }else {
            if (match_counter<num_of_cells_to_win-1){
                match_counter = 0;
            }else {
                i=num_of_rows-1;
            }///if counter is less than the num to win
        }///if there is no match
    }////for
    if (match_counter>= num_of_cells_to_win-1) {
        return true
    }else {
        return false;
    }
}////check row - checks if there is a match in row

function check_col(col) {
    var match_counter = 0;
    for (var i=0;i<num_of_rows-1;i++){
        if(grid_array[i][col]==grid_array[i+1][col] && grid_array[i][col]!==0){
            match_counter++;
        }else {
            if (match_counter<num_of_cells_to_win-1){
                match_counter = 0;
            }else {
                i=num_of_rows-1;
            }///if counter is less than the num to win
        }///if there is no match
    }////for
    if (match_counter>= num_of_cells_to_win-1) {
        return true
    }else {
        return false;
    }
}/////////end of check col - checks if there is a match in column

function diagonal_check_left_to_right(row,col) {
    var counter_top = 1;
    var counter_down= 0;
    /////for loop to go up
    for(var i=1; i<num_of_rows;i++) {
        var new_row= row-i;
        var new_col = col-i;
        if (new_col>=0 && new_row>=0){
            if (grid_array[row][col]==grid_array[new_row][new_col] && grid_array[row][col]!=0) {
                counter_top++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        }else {
            i=num_of_rows;
        }
    }///////for loop to go down
    for(var d=1; d<num_of_rows;d++) {
        var new_ro= row+d;
        var new_co = col+d;
        if (new_co<=num_of_rows-1 && new_ro<=num_of_rows-1){
            if (grid_array[row][col]==grid_array[new_ro][new_co] && grid_array[row][col]!=0) {
                counter_down++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        }else {
            d=num_of_rows;
        }
    }///////for loop to go down
    var total = counter_down+counter_top;
    if (total>= num_of_cells_to_win) {
        return true;
    } else {
        return false;
    }
}//////end of diagonal_check_left_to_right - checks for diagonal match from left to right

function diagonal_check_right_to_left(row,col) {
    var counter_top = 1;
    var counter_down = 0;
    /////for loop to go up
    for (var i = 1; i < num_of_rows ; i++) {
        var new_row = row - i;
        var new_col = col + i;
        if (new_col <= num_of_rows - 1 && new_row >= 0) {
            if (grid_array[row][col] == grid_array[new_row][new_col] && grid_array[row][col] != 0) {
                counter_top++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        } else {
            i = num_of_rows ;
        }
    }///////for loop to go down
    for (var d = 1; d < num_of_rows ; d++) {
        var new_ro = row + d;
        var new_co = col - d;
        if (new_co >= 0 && new_ro <= num_of_rows - 1) {
            if (grid_array[row][col] == grid_array[new_ro][new_co] && grid_array[row][col] != 0) {
                counter_down++;
            }//////////if equal
            else {
                break;
            }///////if not equal
        } else {
            d = num_of_rows ;
        }
    }///////for loop to go down
    var total = counter_down + counter_top;
    if (total >= num_of_cells_to_win) {
        return true;
    } else {
        return false;
    }

}////end of diagonal_check_right to left - checks for diagonal match from right to left

function draw_condition_check(){
    var grid_array_total_cells = grid_array.length * grid_array.length;
    clicked_cells_count++; console.log("clicked_cell_count is now: "+clicked_cells_count);
    if (clicked_cells_count == grid_array_total_cells){
        console.log("draw is reached");
        //animate_drawn_game();
        game_score_draw++;
    }
}//end check_clicked_cells_ function - checks for draw

//TODO ***************************** GRID ARRAY SECTION  *******************************//
var create_grid_array = function () {
    for (var i = 0; i < num_of_rows; i++ ) {
        var inside_array = [];
        for (var j = 0; j < num_of_rows; j++) {
            inside_array.push(0);
        }
        grid_array.push(inside_array);
    }
    console.log(grid_array);
};//////////end of create grid array

//////////////////////in winning animation at the end we need to remove winner class and add player because of reset and restore


