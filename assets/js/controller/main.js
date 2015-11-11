var garageApp = angular.module('garageApp', ['ngRoute', 'ngTable']);

garageApp.controller('mainController', ['$scope', '$log', '$filter', '$timeout', 'NgTableParams', '$interval', 'vehicleService', 'garageService',
function($scope, $log, $filter, $timeout, NgTableParams, $interval, vehicleService, garageService)
{
    /*Variables*/
    $scope.defaultLevels = 1;
    $scope.defaultCarSlots = 5;
    $scope.defaultBikeSlots = 5;
    $scope.vehicles = [];

    var arrGarageSlots = [];
    var levels = $scope.defaultLevels;
    var carslots = $scope.defaultCarSlots;
    var bikeslots = $scope.defaultBikeSlots;
    var totalSlots = ((carslots + bikeslots) * levels);
    var sales = 0;


    /*Methods*/
    // init function
    var init = function ()
    {
        arrGarageSlots = garageService.createGarageSlots(levels, carslots, bikeslots);

        $scope.setTable();

        // Message to user
        var now = new Date();
        $scope.trafficMessage = now.toUTCString() + ": " + "Waiting for vehicles to arrive...";
        $scope.trafficMessage2 = now.toUTCString() + ": " + "Waiting for vehicles to leave...";
    };

    // Settings
    $scope.setSettings = function()
    {
        levels = $scope.defaultLevels;
        carslots = $scope.defaultCarSlots;
        bikeslots = $scope.defaultBikeSlots;
        totalSlots = ((carslots + bikeslots) * levels);

        // reset
        arrGarageSlots = garageService.createGarageSlots(levels, carslots, bikeslots);
        sales = 0;
        // Message to user
        var now = new Date();
        $scope.trafficMessage = now.toUTCString() + ": " + "Waiting for vehicles to arrive...";
        $scope.trafficMessage2 = now.toUTCString() + ": " + "Waiting for vehicles to leave...";
    };

    // NgTableParams
    $scope.setTable = function()
    {
        $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 100, // count per page
                filter: {
                    type: 'parkingslot' // initial filter
                },
                sorting: {
                    parkingslot: 'asc'
                }
            },
            {
                total: $scope.vehicles.length, // length of data
                getData: function ($defer, params) {
                    $defer.resolve($scope.vehicles);
                }
            });
    }

    // Create new car timer
    $scope.vehicleCreator = function()
    {
        var sleep = Math.floor(Math.random() * 20000);

        setTimeout(function() { $scope.createVehicle();}, sleep);
    }

    // Create new car
    $scope.createVehicle = function()
    {
        var plate = vehicleService.getPlate();
        var type = vehicleService.getType();
        var brand = vehicleService.getBrand();
        var parkingtime = vehicleService.getParkingTime();
        var parked = false;

        for(var i = 0; i < arrGarageSlots.length; i++)
        {
            if(arrGarageSlots[i].slotStatus == "free" && arrGarageSlots[i].slotType == type)
            {
                // park vehicle into free slot
                arrGarageSlots[i].slotStatus = "occupied";
                arrGarageSlots[i].plate = plate;
                arrGarageSlots[i].type = type;
                arrGarageSlots[i].brand = brand;
                arrGarageSlots[i].parkingtime = parkingtime;

                parked = true;

                // Message to user
                var now = new Date();
                $scope.trafficMessage = now.toUTCString() + ": " + "The "+ type  +" "+ brand + " with the license plate '" + plate + "' has entered the garage.";
                $scope.slotMessage = arrGarageSlots[i].level + "/" + arrGarageSlots[i].slot;

                break;
            }
        }

        if(parked == false)
        {
            // Message to user
            var now = new Date();
            $scope.trafficMessage = now.toUTCString() + ": " + "The "+ type +" "+ brand + " with the license plate '" + plate + "' has arrived at the garage. The garage is full. The car is being rejected.";
        }
    }

    // Decrease parking time & update table
    $scope.updateGarageSlots = function()
    {
        for (var i = 0; i < arrGarageSlots.length; ++i)
        {
            if(arrGarageSlots[i].slotStatus == "occupied")
            {
                // Decrease parking time
                arrGarageSlots[i].parkingtime -= 1;

                // Remove vehicles with parking time 0
                if(arrGarageSlots[i].parkingtime <= 0)
                {
                    // Message to user
                    var now = new Date();
                    $scope.trafficMessage2 = now.toUTCString() + ": " + "The " + arrGarageSlots[i].type + " "  + arrGarageSlots[i].brand + " with the licence plate '" + arrGarageSlots[i].plate + "' has left the garage.";

                    // remove from garage
                    arrGarageSlots[i].slotStatus = "free";
                    arrGarageSlots[i].plate = "";
                    arrGarageSlots[i].type = "";
                    arrGarageSlots[i].brand = "";
                    arrGarageSlots[i].parkingtime = 0;
                }
                else
                {
                    // Sales volume (1 min costs 0.1 USD)
                    sales += 0.1;
                    sales = Math.round(sales * 100) / 100;
                    $scope.sales = "Sales volume: " + sales + " $";
                }
            }
        }

        // reset table & add vehicles to table
        $scope.vehicles = [];
        for (var i = 0; i < arrGarageSlots.length; ++i)
        {
            if(arrGarageSlots[i].slotStatus == "occupied")
            {
                $scope.vehicles.push({"plate": arrGarageSlots[i].plate,
                                      "type": arrGarageSlots[i].type,
                                      "brand": arrGarageSlots[i].brand,
                                      "parkingtime": arrGarageSlots[i].parkingtime,
                                      "parkingslot": arrGarageSlots[i].level + "/" + arrGarageSlots[i].slot});
            }
        }

        // Message to user
        $scope.message2 = "Vehicles in garage: " + $scope.vehicles.length + " of " + totalSlots;
    }

    // Interval function trigger
    $interval( function(){ $scope.vehicleCreator(); }, 5000)

    // Interval function trigger
    $interval( function(){ $scope.updateGarageSlots();}, 1000)


    // Call init function
    init();
}]);

