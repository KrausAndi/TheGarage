garageApp.service('garageService', function()
{
    /*Variables*/
    var self = this;

    /*Methods*/
    this.createGarageSlots = function(levels, carslots, bikeslots)
    {
        var arrGarageSlots = [];

        // create levels
        for(var levelIndex = 1; levelIndex <= levels; ++levelIndex)
        {
            // create car slots per level
            for(var slotIndex = 1; slotIndex <= carslots; ++slotIndex)
            {
                arrGarageSlots.push({"level": levelIndex,
                                     "slot": slotIndex,
                                     "slotType": "Car",
                                     "slotStatus": "free",
                                     "plate": "",
                                     "type": "",
                                     "brand": "",
                                     "parkingtime": 0});
            }

            // create motorcycle slots per level
            for(var slotIndex = 1; slotIndex <= bikeslots; ++slotIndex)
            {
                arrGarageSlots.push({"level": levelIndex,
                                     "slot": slotIndex,
                                     "slotType": "Motorcycle",
                                     "slotStatus": "free",
                                     "plate": "",
                                     "type": "",
                                     "brand": "",
                                     "parkingtime": 0});
            }
        }

        return arrGarageSlots;
    };
});
