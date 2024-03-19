App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    hasVoted: false,
  
    init: function() {
      return App.initWeb3();
    },
  
    initWeb3: function() {
      
      if (typeof web3 !== 'undefined') {
        
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } else {
       
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        web3 = new Web3(App.web3Provider);
      }
      return App.initContract();
    },
  
    initContract: function() {
      $.getJSON("baucu.json", function(baucu) {
       
        App.contracts.baucu = TruffleContract(baucu);
        
        App.contracts.baucu.setProvider(App.web3Provider);
  
        App.listenForEvents();
  
        return App.render();
      });
    },
  
    
    listenForEvents: function() {
      App.contracts.baucu.deployed().then(function(instance) {
        
        instance.votedEvent({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).watch(function(error, event) {
          console.log("event triggered", event)
          
          App.render();
        });
      });
    },
  
    render: function() {
      var baucuInstance;
      var loader = $("#loader");
      var content = $("#content");
      var loadinfo = $("#loadinfo");
      var tt = $("#tt");
      tt.hide();
      loader.show();
      content.hide();
     loadinfo.hide();
      
     
  
      // Load account data
      web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
          App.account = account;
          $("#accountAddress").html("Your Account: " + account);
        }
      });
  
      // Load contract data
      App.contracts.baucu.deployed().then(function(instance) {
        baucuInstance = instance;
        return baucuInstance.candidatesCount();
      }).then(function(candidatesCount) {
        var candidatesResults = $("#candidatesResults");
        candidatesResults.empty();

        var candidatesinfo = $("#candidatesinfo"); //admin
        candidatesinfo.empty();
  
        var candidatesSelect = $('#candidatesSelect');
        candidatesSelect.empty();

        var infoSelect = $('#infoSelect');
        infoSelect.empty();

        var ten = $('#ten')
        var y = new Array();

       ;
  
        for (var i = 1; i <= candidatesCount; i++) {
          baucuInstance.candidates(i).then(function(candidate) {
            var id = candidate[0];
            var name = candidate[1];
            var gioitinh = candidate[2];
            var tuoi = candidate[3];
            var tomtat = candidate[4];
            var voteCount = candidate[5];
  
            // var candidateTemplate;
            // candidateTemplate.empty();
            var candidateTemplate = "<tr><td>" + id + "</td><td>" + name + "</td><td>"+ voteCount + "</td></tr>"
            candidatesResults.append(candidateTemplate);
  
          
            var candidateOption = "<input class='form-check-input' name='candidate' type='checkbox' id='abc' value='" + id + "'> <label for='customCheckbox1' class='custom-control-label'>" + name + "</label><br>"
            candidatesSelect.append(candidateOption);
            
           
            var candidateTemplate2 = "<tr><td>" + id + "</td><td><strong>" + name + "</strong></td><td>" + gioitinh + "</td><td>" + tuoi + "</td></tr>"
            candidatesinfo.append(candidateTemplate2);

            var candidateOption1 = "<option value='" + id + "' >" + name + "</ option>"
            infoSelect.append(candidateOption1); 
            
             var tentemplate= ""+name+",";
            // ten.append(tentemplate)
            
            //  y.push(tentemplate);
            ten.append(tentemplate);
            
          });
        }
        return baucuInstance.voters(App.account);
      }).then(function(hasVoted) {
        
        loader.hide();
        content.show();
        tt.show();
        // Do not allow a user to vote
        if(hasVoted) {
          //$('form').hide();
          content.hide();
          tt.hide();
        }
      }).catch(function(error) {
        console.warn(error);
      });
    },
  
    
  
    


    //ham xem phan gioi thieu
    infoCandidates: function() {
      var id=$("#infoSelect").val();
      App.contracts.baucu.deployed().then(function(instance) {
        baucuInstance = instance;
        return baucuInstance.candidatesCount();
      }).then(function(candidatesCount) {
        
        var fullname = $("#fullname");
        fullname.empty();
        var sex = $("#gioitinh");
        sex.empty();
        var tuoi = $("#info_tuoi");
        tuoi.empty();
        var tomtat = $("#tomtat");
        tomtat.empty();
        baucuInstance.candidates(id).then(function(candidate) {
          var info_name = candidate[1];
          var info_gioitinh = candidate[2];
          var info_tuoi = candidate[3];
          var info_tomtat = candidate[4];
          var bien = ""+info_tuoi+"";
          fullname.append(info_name);
          sex.append(info_gioitinh);
          tuoi.append(bien);
          tomtat.append(info_tomtat);
          $("#loadinfo").show();
        });
      }).catch(function(error) {
        console.warn(error);
      });
    },

    kq: function() {
      var ten=$("#ten").val();
      App.contracts.baucu.deployed().then(function(instance) {
        baucuInstance = instance;
        return baucuInstance.candidatesCount();
      }).then(function(candidatesCount) {
        baucuInstance.candidates(1).then(function(candidate) {
          var info_name = candidate[1];
          var info_gioitinh = candidate[2];
          var info_tuoi = candidate[3];
          var info_tomtat = candidate[4];
          var bien = ""+info_tuoi+"";
          ten.append(info_name);
          
          
        });
      }).catch(function(error) {
        console.warn(error);
      });
    },

  }
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  