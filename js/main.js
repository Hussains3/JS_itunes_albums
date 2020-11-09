// ITUNES URL
// https://itunes.apple.com/search?term=ARTIST&entity=album
var musicdb = new musicDB;
function musicDB(){
    this.init = function(){
        this.search();
    };
    this.search =function(){
        var $this =this;
        var form = document.querySelector('#form');
        form.addEventListener('submit', function(e){
            e.preventDefault();
            var value = document.querySelector('#input_search').value;
            form.reset();
            $this.getData(value);


        });
    };
    this.getData = function(artist){
        var $this = this;
        var http = new XMLHttpRequest();
        var url = 'https://itunes.apple.com/search?term='+artist+'&entity=album';
        var method = "GET";
        var albums = document.querySelector('#album_list_container');
        albums.innerHTML = '';
        http.open(method,url);
        http.onreadystatechange = function(){
            if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                $this.showArtist(JSON.parse(http.response));
            } else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){
                console.log('connection faild');
            }
        };
        http.send();
    };

    this.showArtist = function(albums){
        var container = document.querySelector('#album_list_container');
        var not_match = document.querySelector('#not_match');
        var template = '';

        if (albums.results.length > 0) {
            not_match.style.display = 'none';

            for (let i = 0; i < albums.results.length; i++) {

                template += '<div class="col-sm-3 album_item">'
                template += '<div class="item_thmb" style="background: url('+albums.results[i].artworkUrl100+')"></div>'
                template += '<div class="item_title">'+albums.results[i].collectionName+'</div>'
                template += '<div class="item_price">'
                template += '<span>Price:</span>'+albums.results[i].collectionPrice+' USD'
                template += '</div>'
                template += '<a href="'+albums.results[i].collectionViewUrl+'" target="_blank">Buy Now</a>'
                template += '</div>'
                
            }

            container.innerHTML = '';
            container.insertAdjacentHTML('afterbegin',template);
        } else {
            not_match.style.display = 'block';
        }


    };





    this.init();
};