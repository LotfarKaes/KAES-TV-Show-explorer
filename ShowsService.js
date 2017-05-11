/**
 * Service to connect to OMDB API
 */
angular.module('showExplorer')
    .factory('ShowsService',ShowsService);

ShowsService.$inject = ['ApiUrl','MonthNames','$resource'];
function ShowsService(ApiUrl,MonthNames,$resource){
    /**
     * Angular resource that handles requests to OMDB API
     */
    var showResource = $resource(ApiUrl,{},{});

    var svc = {};
    svc.getShow = getShow;
    svc.getShowSeasonEpisodes = getShowSeasonEpisodes;

    return svc;

    /**
     * Get a show by show title
     * @param showTitle
     * @returns {*}
     */
    function getShow(showTitle) {
        return showResource.get({t: showTitle})
            .$promise
            .then(getShowSeasonEpisodes);
    }


    /**
     * Grab the episodes in a specified season for the specified show
     * @param showObject
     * @param seasonNumber
     * @returns {*}
     */
    function getShowSeasonEpisodes(showObject,seasonNumber){

        return _getSeasonObject()
            .then(_getAllEpisodes);


        function _getSeasonObject(){
            return new Promise(function(resolve,reject){
                if (!seasonNumber){
                    seasonNumber = 1;
                }

                if (!showObject || !showObject.Response || showObject.Response === 'False'){
                    return reject(new Error('Show Not Found!'));
                }
                if (Number(seasonNumber) > Number(showObject.totalSeasons)){
                    return reject(new Error('Show Only Has ' + (showObject.totalSeasons || 0) + ' Seasons!'));
                }

                showResource.get({t:showObject.Title,Season:seasonNumber})
                    .$promise
                    .then(resolve,reject);
            });
        }

        function _getAllEpisodes(seasonObject){
            return new Promise(function(resolve,reject){
                //get the plot and poster information
                var fns = [];

                var episodes = seasonObject.Episodes;
                for (var i = 0; i < episodes.length; i++){
                    fns.push(showResource.get({t:showObject.Title,Season:seasonObject.Season,Episode:episodes[i].Episode}).$promise);
                }

                Promise.all(fns)
                    .then(function(results){
                        //format episode data
                        results = results.map(function(e){
                            e.releaseMonth = MonthNames[new Date(e.Released).getMonth()] + ' ' + new Date(e.Released).getFullYear();
                            e.imdbRating = Number(e.imdbRating);
                            return e;
                        });

                        //sort the episodes
                        results.sort(function(a,b){
                            return Number(a.Episode) - Number(b.Episode);
                        });

                        showObject.Episodes = results;
                        showObject.Season = Number(seasonNumber);
                        return resolve(showObject);
                    },reject);
            });
        }
    }
}