var mysql = require("mysql");
var inquirer = require("inquirer");


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Passw0rd",
    database: "bamazon_db",

});

connection.connect(function (error) {
    if (error) {
        throw error
    }

    console.log("connected to ID " + connection.threadId);

    runApplication();
});

function runApplication() {
    connection.query("select * from products", function (error, results) {
        if (error) {
            throw error;
        }

        console.table(results);
        
        prompt1(results);
    })

};

function prompt1(inventory) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "custChoice",
                massage: "Enter the Product Id you'd like to purchase",
                validate: function (val) {
                    return !isNaN (val) 

                }
            },
        ])
        .then(function (val) {

            
            var custSelection = parseInt(val.custChoice);
            var inventcheck = checkInt(custSelection,inventory);


            if (inventcheck) {

                quantityCheck(inventcheck);
            }
            else {
                console.log("we out!")
            }

        });
}


function quantityCheck(inventcheck) {


    inquirer
        .prompt([{
            type: "input",
            name: "quantity",
            massage: "How many would you like to purchase?",
            validate: function(val){
            return val > 0
            }
        }
    ])
        .then(function (val) {


            var quantity = parseInt(val.quantity);

            if(quantity > inventcheck.stock_quantity){

                console.log("we out! Pick something else");
                runApplication();
            }
            else{

                transactionFunc(inventcheck,quantity);
                //runApplication();
            }

        });

    }
        function transactionFunc(inventcheck, quantity){

        connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        
        [quantity, checkInt.item_id],

        function(err, res){

            console.log("we'll get that shipped out")

            connection.end();

});

        };

        function checkInt(custChoice, inventory){
        for(var i= 0; i < inventory.length; i++){
            if(inventory[i].item_id === custChoice){
                return inventory[i];
            }

        }

        return null;
        }
