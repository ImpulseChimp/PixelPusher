function getRanges() {
  var parameters = {};
    parameters['api_name'] = 'admin';
    parameters['api_method'] = 'get_range';
    parameters['type'] = 'current';

    api_request(parameters, function(response){
        if(response['success'] == true) {
          var x = parseInt(response['data']['x_range']);
          var y = parseInt(response['data']['x_range']);

          alert(x + " " + y);
        }
        else {
            alert('api called failed');
        }
    });
}
