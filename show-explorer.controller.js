angular.module('showExplorer')
    .controller('showExplorerCtrl',showExplorerCtrl);

showExplorerCtrl.$inject = ['ShowsService','$mdDialog','$timeout'];
function showExplorerCtrl(ShowsService,$mdDialog,$timeout){
    var vm = this;

    vm.getShow = getShow;
    vm.getSeason = getSeason;
    vm.getAverageRating = getAverageRating;
    vm.hideEpisode = hideEpisode;

    vm.testData = 'this is only a test!';
    vm.searchText = 'Silicon Valley';
    vm.show = null;
    vm.loadingShow = false;
    vm.loadingEpisodes = false;

    /**
     * Initialize the show explorer controller
     */
    function activate(){
        //get the default show object from api
        getShow();
    }
    activate();

    /**
     * Find the show corresponding to search text
     */
    function getShow(){
        vm.loadingShow = true;
        vm.show = null;
        ShowsService.getShow(vm.searchText)
            .then(function(show){
                vm.loadingShow = false;
                vm.show = show;
            },function(err){
                vm.loadingShow = false;
                showErrorPopup(err.message || 'Oops! Something Went Wrong.');
            });
    }


    /**
     * Get the episodes for a particular season of the current show
     * @param seasonNumber
     */
    function getSeason(seasonNumber){
        vm.loadingEpisodes = true;
        ShowsService.getShowSeasonEpisodes(vm.show,seasonNumber)
            .then(function(show){
                //timeout because the loading dialog looks goofy if the results load too quickly
                $timeout(function(){
                    vm.loadingEpisodes = false;
                    vm.show = show;
                },500);
            },function(err){
                vm.loadingEpisodes = false;
                showErrorPopup(err.message || 'Oops! Something Went Wrong.')
            });
    }


    /**
     * Get the average imdb rating of the episodes that are visible
     * @returns {number}
     */
    function getAverageRating(){
        if (!vm.show)
            return;

        var total = 0;
        var numOfShows = vm.show.Episodes.length;

        for (var i = 0; i < vm.show.Episodes.length; i++){
            total += vm.show.Episodes[i].imdbRating;
        }

        return total/numOfShows;
    }


    /**
     * Remove an episode from the list and from the average rating
     * @param episode
     */
    function hideEpisode(episode){
        var episodeId = episode.imdbID;
        for (var i = vm.show.Episodes.length-1; i >= 0; i--){
            if (vm.show.Episodes[i].imdbID === episodeId){
                vm.show.Episodes.splice(i,1);
                break;
            }
        }
    }

    /**
     * Generic Error popup
     * @param errorTxt
     */
    function showErrorPopup(errorTxt){
        $mdDialog.show({
            controller:DialogController,
            locals:{errorText:errorTxt},
            templateUrl:'error-dialog.tmpl.html'
        });
    }

    /**
     * Controller for the generic eror popup
     * @param $scope
     * @param $mdDialog
     * @param errorText
     * @constructor
     */
    DialogController.$inject = ['$scope','$mdDialog','errorText'];
    function DialogController($scope,$mdDialog,errorText){
        $scope.error = errorText;
        $scope.cancel = function(){
            $mdDialog.cancel();
        }
    }
}