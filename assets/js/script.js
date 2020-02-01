$( document ).ready(function(){

    // When a user submits input save that input to a variable and call the findEvents function
    $("#search-form").submit(function(event){
        var userInput = String($("#user-input").val());
        console.log(userInput);
        event.preventDefault();
        findEvents(userInput);
    });

    // FindEvents takes user artist input passes that and apikey to songkick api and obtains a response
    function findEvents(userInput) {
        axios.get('https://api.songkick.com/api/3.0/events.json', {
            params: {
                apikey: 'bguT074ohahXwEwu',
                artist_name: userInput
            }
        })
            .then(function (response) {
                console.log(response);
                $(function() {
                    $('#table').bootstrapTable({data: getData(response)})
                })

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getData(response) {
        var total = parseInt(response.data.resultsPage.totalEntries);
        console.log(total);

        var second = response.data.resultsPage.results.event[1].displayName
        console.log(second);

        var data = [];
        for(var i = 0; i < total; i++){
            data.push({
                'Artist': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].displayName,
                'Date': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].start && response.data.resultsPage.results.event[i].start.date,
                'City': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.city,
                'Venue': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].venue && response.data.resultsPage.results.event[i].venue.displayName
            });
        }
        console.log(data);
        return data;
    }

    // $(function() {
    //     $('#table').bootstrapTable({
    //         data: data
    //     });
    // });

});