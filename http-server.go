package main

import (
	"net/http"
	"fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
)



//this stops user client from seeing anything on the server. TODO
func handler(w http.ResponseWriter, r *http.Request){
	http.ServeFile(w, r, r.URL.Path[1:])
	fmt.Println(r.URL.Path[1:])
}

func loginHandler(w http.ResponseWriter, r *http.Request, db *sql.DB){

	fmt.Println("Request to login_attempt acknowledged.")

	m := r.URL.Query()
	username, password := m["username"][0], m["password"][0]

	//now check if user exists in our database
	rows, err := db.Query("SELECT token FROM users WHERE user=? AND password=?", username, password)
	if err != nil{
		log.Fatal(err)
	}
	defer rows.Close()
	fmt.Println(rows)
	var token int = 0;
	for rows.Next() {
		if err := rows.Scan(&token); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("token = %d\n", token)
	}
	
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "{\"data\" : \"%d\"}", token)
}

func imageHandler(w http.ResponseWriter, r *http.Request){

	fmt.Println("Request to app/navbar/items.json acknowledged.")
	w.Header().Set("Content-Type", "application/json")
	http.ServeFile(w, r, r.URL.Path[1:])
}

func main() {
	// Create the databse handle, confirm driver is present
	db, _ := sql.Open("mysql", "user:pass@/ang2blog")
	defer db.Close()

	// Connect and check the server version
	var version string
	db.QueryRow("SELECT VERSION()").Scan(&version)
	fmt.Println("Successfully connected to:", version)

	http.HandleFunc("/", handler)
	http.HandleFunc("/login_attempt",  func(w http.ResponseWriter, r *http.Request){
		loginHandler(w, r, db);
	})

	http.HandleFunc("/app/images/pics.json", imageHandler)


	fmt.Println("Listening on 3000")
	http.ListenAndServe(":3000", nil)

}
