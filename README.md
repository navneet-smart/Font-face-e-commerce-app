# Fontface E-Commerce App 
This is an ecommerce site, under development,where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes. The homepage should display a list of products for people to browse.

## Features
----
- products are displayed in a grid.
- give the user an option to sort the products in ascending order. Can sort by "size", "price" or "id". The products list should be      reloaded when a new sorting option is chosen.
- each product has :
  a "size" field, which is the font-size (in pixels). We should display the faces in their correct size, to give customers a realistic     impression of what they're buying.
- a "price" field, in cents. This should be formatted as dollars like `$3.51`.
- a "date" field, which is the date the product was added to the catalog. Dates should be displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date should be displayed.
- the product grid should automatically load more items as you scroll down.
- display an animated "loading..." message while the user waits for the data to load.

- when the user reaches the end and there are no more products to display, shown the message "~ end of catalogue ~".
 
## Please read the instructions and FAQ below to execute.

1. Make sure the server-side code is running on your local host
2. Install react cli 
3. Move to project directory and run command npm install
4. Set your ip in  .env file variable "REACT_APP_IP" and currency symbol "REACT_APP_CURRENCY"
5. Run command npm start

** Note : server is using port no 4000 as react was also using portno 3000, so i changed it to 4000.





