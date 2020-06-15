QuadraticVoting.directive('qvApp', function() {
    var component = QuadraticVoting.App;
    return {
        templateUrl: '/src/quadratic-voting/app/app.html',
        controller: component.controller,
        scope: {}
    };
});
QuadraticVoting.App = {};
QuadraticVoting.App.controller = function($scope, $element, $http) {
    var _ = $scope;
    _.component = QuadraticVoting.App;

    _.ballotItems = [{
        question: 'Exchange & Investment',
        options: [{
            name: 'Centralized, Decentralized exchange(Binance, FTX, Uniswap)'
        }, {
            name: 'Trading bot(Pionex)'
        }, {
            name: 'Crypto Mining & Staking(ETH 2.0)'
        }]
    }, {
        question: 'DApp(Defi, Cefi, Game, NFT)',
        options: [{
            name: 'Lending & Borrowing(Compound, Steaker)'
        }, {
            name: 'Stable Coin(USDC, MakerDAO)'
        }, {
            name: 'Casino Game(Stake, Duckdice)'
        }, {
            name: 'Ponzi scheme(Fomo3D)'
        }, {
            name: 'Non fungible token(Gods Unchained, Cryptokitties) - Game'
        }, {
            name: 'Non fungible token(Superrare, Knownorigin) - Crypto Artwork'
        }]
    }, {
        question: 'Fundraising',
        options: [{
            name: 'ICO, IEO, Other variants'
        }]
    }, {
        question: 'Application scenario',
        options: [{
            name: 'Supply Chain'
        }, {
            name: 'Cyber Security'
        }, {
            name: 'Traceability of Products'
        }, {
            name: 'Solution Provider'
        }, {
            name: 'Wallet(Dapp Pocket, Blocto)'
        }]
    }, {
        question: 'Technical perspective',
        options: [{
            name: 'Layer2(zkRollup, Plasma)'
        }, {
            name: 'Lightning network'
        }]
    }];

    _.votes = []; // Hash of Options : Vote count integer
    $(_.ballotItems).each(function(i, ballotItem) {
        $(ballotItem.options).each(function(i, option) {
            _.votes.push({
                option: option,
                votes: 0
            });
        });
    });

    function getVoteOption(option) {
        for (var i = 0; i < _.votes.length; i++) {
            var voteOption = _.votes[i];
            if (voteOption.option == option) {
                return voteOption;
            }
        }
        console.error('Not found');
    }

    _.votesPerPerson = 20;

    _.getVotesRemaining = function() {
        var numVotesUsed = 0;
        var numVotesUsed2 = 0;
        $(_.votes).each(function(i, voteOption) {
            numVotesUsed = 0;
            for (var i = 1; i <= voteOption.votes; i++) {
                var voteCost = _.getVoteCost(i);
                numVotesUsed = voteCost;
            }
            numVotesUsed2 += numVotesUsed;
        });
        var value = _.votesPerPerson - numVotesUsed2;
        return value;
    }

    _.getVoteCount = function(option, asArray) {
        var count = 0;
        var voteOption = getVoteOption(option);
        count += voteOption.votes;
        if (asArray && count) {
            var array = [];
            for (var i = 0; i < count; i++) {
                array.push(i);
            }
            return array;
        }
        return count;
    }

    _.addVote = function(option) {
        if (_.getVotesRemaining() <= 0) return;
        var voteOption = getVoteOption(option);
        var voteNumber = voteOption.votes + 1;
        var voteCost = _.getVoteCost(voteNumber);
        voteOption.votes++;
    }

    _.removeVote = function(option) {
        var voteOption = getVoteOption(option);
        var voteNumber = voteOption.votes - 1;
        var voteCost = _.getVoteCost(voteNumber);
        voteOption.votes--;
    }

    _.doShowAddVoteButton = function(option) {
        var voteOption = getVoteOption(option);
        var voteNumber = voteOption.votes + 1;
        var voteCost = _.getVoteCost(voteNumber);
        var votesRemaining = _.getVotesRemaining();
        var canAffordVote = (votesRemaining >= voteCost);
        return canAffordVote;
    }

    _.doShowRemoveVoteButton = function(option) {
        var voteOption = getVoteOption(option);
        return (voteOption.votes > 0);
    }

    _.getVoteCost = function(numVotes) {
        var equation = powerOfTwo;
        var value = equation(numVotes);
        return value;
    }
    var myip = '';
    $.getJSON('https://ipapi.co/json/', function(data) {
        myip = data.ip;
    });

    _.send = function() {
        $("#send_button").hide();
        var text;
        $(_.votes).each(function(i, voteOption) {
            text += voteOption.option.name + ": ";
            text += voteOption.votes + "  ,";
        });
        text += new Date().toLocaleString() + ",   ";
        text += myip + ",   ";
        console.log(text);
        $.post("https://script.google.com/macros/s/AKfycbwcp9dAOvYY54BdfbiW3QUgSz_SLnNnHh8lb2svrTum-hw0FJI/exec", { first: text }, function(result) {
            alert("Submit Successfully! Look forward to seeing you soon!");
        });
    }

    function quadraticEquation(numVotes) {
        // TODO: Add a quadratic equation.
        return;
    }

    function squared(numVotes) {
        var cost = Math.pow(2, numVotes - 1);
        return cost;
    }

    function powerOfTwo(numVotes) {
        var cost = Math.pow(2, numVotes - 1);
        return cost;
    }

}
