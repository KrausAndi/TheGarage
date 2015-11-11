garageApp.service('vehicleService', function()
{
    /*Variables*/
    var self = this;
    this.plate = "";
    this.type = "";
    this.brand = "";
    this.parkingtime = 0;

    /*Methods*/
    this.getPlate = function()
    {
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var str = "";

        // Erzeuge zwei Zufallsbuchstaben nach M-
        for( var i=0; i < 2; i++ )
            str += letters.charAt(Math.floor(Math.random() * letters.length));

        // Erzeuge vierstellige Zufallszahl nach M-XY
        var zufallszahl = Math.floor(Math.random() * 9999);

        this.plate = "M-" + str + " " + zufallszahl;

        return self.plate;
    };
    
    this.getType = function()
    {
        var diffTypes = new Array("Motorcycle", "Car");
        var i = Math.floor(Math.random() * diffTypes.length);
        this.type = diffTypes[i];

        return self.type;
    };

    this.getBrand = function()
    {
        if(this.type === "Car")
        {
            var diffBrands = new Array("Mercedes", "BMW", "Seat","Renault", "Citroen", "Fiat","Ford", "Saab", "Volvo", "Lada", "Range Rover","Jeep", "Toyota", "Kia","Hundai", "Opel", "Porsche");
            var i = Math.floor(Math.random() * diffBrands.length);
            this.brand = diffBrands[i];
        }
        else if(this.type === "Motorcycle")
        {
            var diffBrands = new Array("Royal Enfield", "Honda", "Kawasaki", "Trimph", "BMW", "Motoguzzi", "Suzuki", "Simson");
            var i = Math.floor(Math.random() * diffBrands.length);
            this.brand = diffBrands[i];
        }

        return self.brand;
    };

    this.getParkingTime = function()
    {
        // parking time
        this.parkingtime = Math.floor(Math.random() * 180) + 10;

        return self.parkingtime;
    };
});
















