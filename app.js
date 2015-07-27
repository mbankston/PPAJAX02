console.log('we got it!');
var searchUser;

$(document).ready(function(){

    $(".submitButton").on('click', function(event){
            event.preventDefault();
            searchUser = $('#searchBox').val();
            search(searchUser);
            search2(searchUser);    
        });


function callback(data){
    console.log(data);
        $('#profileImage').children().remove();
        $('#otherInfo').children().remove();
        $("#profileImage").append("<p>Profile image: <img class='img-responsive img-thumbnail' src='" + data.avatar_url + "' </p><br>");
        $("#otherInfo").append("<p>Username: "+ data.login + "</p>");
        $("#otherInfo").append("<p>Location: "+ data.location + "</p>");
        $("#otherInfo").append("<p><a href='" + data.html_url + "'target='blank'>"+data.login + "'s Github:" +"</a></p>");
        $("#otherInfo").append("<p>Bio Information: " + data.bio + "</p>");

}       

function repoCallback(data){
        console.log(data);
        $('#repoList').children().remove();
        $("#repoList").append("<h3 class='text-center'>Repo List</h3>");
        for (var i = 0; i<data.length; i++) {
        $("#repoList").append("<div class='col-md-4'><p><a class='link' href=\"" + data[i].html_url + "\">"+ data[i].name + "</a></p></div>");
    }
}
        
function search(query){
    $.ajax({
        type:'GET',
        dataType:'json',
        crossDomain:true,
        url:'https://api.github.com/users/'+ encodeURI(searchUser) + '?client_id=f8a4b95805c9804c9eb7&client_secret=4b1bff35a5b8b802fe4bb4e1204afd2f56fc8d8d',
        success: function(data){

            callback(data); 
            // $('#results').html("");
            $(".failedSearch").text("");
                   
        },
        error: function(errorThrown) { 
            $(".failedSearch").text("Your search for " + searchUser + " failed.");
            $('#repoList').children().remove();
            $('#profileImage').children().remove();
            $('#otherInfo').children().remove();
        },
        complete: function() {
            console.log('search1 complete');
        }
        
    });
}
function search2 (query2) {
    $.ajax({
        url: 'https://api.github.com/users/' + encodeURI(searchUser) + '/repos?client_id=f8a4b95805c9804c9eb7&client_secret=4b1bff35a5b8b802fe4bb4e1204afd2f56fc8d8d',
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function(data){
            repoCallback(data);
        },
        complete: function() {
                console.log('search2 complete');
        }
    });
}
});