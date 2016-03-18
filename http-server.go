package main

import (
	"net/http"
	"fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"reflect"
	"bytes"
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

func registerHandler(w http.ResponseWriter, r *http.Request, db *sql.DB){

	fmt.Println("Request to register_attempt acknowledged.")

	m := r.URL.Query()
	username, password := m["username"][0], m["password"][0]

	//now check if user exists in our database
	rows, err := db.Query("SELECT EXISTS(SELECT * FROM users WHERE user=? AND password=?)", username, password)
	if err != nil{
		log.Fatal(err)
	}
	defer rows.Close()
	fmt.Println(rows)

	var exists int = 0; // 0 if not exists, 1 otherwise

	for rows.Next() {
		if err := rows.Scan(&exists); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("exists = %d\n", exists)
	}

	//if doesn't exist
	if exists == 0 {	
		db.Exec("INSERT INTO users VALUES(?, ?, 2)", username, password)
	}
	
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "{\"data\" : \"%d\"}", exists)
}

func imageHandler(w http.ResponseWriter, r *http.Request){

	fmt.Println("Request to app/navbar/items.json acknowledged.")
	w.Header().Set("Content-Type", "application/json")
	http.ServeFile(w, r, r.URL.Path[1:])
}

func blogPostsHandler(w http.ResponseWriter, r *http.Request, db *sql.DB){

	fmt.Println("Request to get_blog_posts acknowledged.")
	
	rows, err := db.Query("SELECT data FROM BlogPosts ORDER BY dateTime")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var data string;
	var s []string;
	var buffer bytes.Buffer

	buffer.WriteString("{\"data\" : [")

	for rows.Next(){
		if err := rows.Scan(&data); err != nil {
			log.Fatal(err)
		}

		s = append(s, data)
		fmt.Println(data);
	}

	for i := len(s)-1; i >= 0; i-- {
		buffer.WriteString(s[i])

		if i != 0 {
			buffer.WriteString(",")
		}
	}

	buffer.WriteString("]}")
	
	fmt.Println(buffer.String())

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, buffer.String())
}


func addBlogPostHandler(w http.ResponseWriter, r *http.Request, db *sql.DB){
	fmt.Println("Request to attempt_to_add_blog_post acknowledged.")
	
	m := r.URL.Query()
	owner, dateTime, blogPost := m["owner"][0], m["date"][0], m["blogPost"][0]
	fmt.Println(owner, dateTime)
	fmt.Println(reflect.TypeOf(blogPost))

	db.Exec("INSERT INTO BlogPosts VALUES(?, ?, ?)", owner, dateTime, blogPost)

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "{\"data\" : \"%d\"}", 1)

}

func deleteBlogPostHandler(w http.ResponseWriter, r *http.Request, db *sql.DB){
	fmt.Println("Request to attempt_to_delete_blog_post acknowledged.")
	
	m := r.URL.Query()
	owner, dateTime := m["owner"][0], m["date"][0]

	fmt.Println(owner, dateTime)
	db.Query("DELETE FROM BlogPosts WHERE owner=? AND dateTime=?", owner, dateTime)

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "{\"data\" : \"%d\"}", 1)

}

func updateBlogPostHandler(w http.ResponseWriter, r *http.Request, db *sql.DB){
	fmt.Println("Request to attempt_to_update_blog_post acknowledged.")
	
	m := r.URL.Query()
	owner, dateTime, data := m["owner"][0], m["date"][0], m["data"][0]

	db.Exec("UPDATE BlogPosts SET data=? WHERE owner=? AND dateTime=?", data, owner, dateTime)

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "{\"data\" : \"%d\"}", 1)
}

func refreshHandler(w http.ResponseWriter, r*http.Request){
	http.ServeFile(w, r, "index.html")
	fmt.Println("browser refresh.")
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

	/*******All service requests*****/
	http.HandleFunc("/login_attempt",  func(w http.ResponseWriter, r *http.Request){
		loginHandler(w, r, db);
	})

	http.HandleFunc("/register_attempt",  func(w http.ResponseWriter, r *http.Request){
		registerHandler(w, r, db);
	})

	http.HandleFunc("/get_blog_posts", func(w http.ResponseWriter, r *http.Request){
		blogPostsHandler(w, r, db)
	})

	http.HandleFunc("/app/images/pics.json", imageHandler)

	http.HandleFunc("/attempt_to_add_blog_post", func(w http.ResponseWriter, r *http.Request){
		addBlogPostHandler(w, r, db)
	})

	http.HandleFunc("/attempt_to_delete_blog_post", func(w http.ResponseWriter, r *http.Request){
		deleteBlogPostHandler(w, r, db)
	})

	http.HandleFunc("/attempt_to_edit_blog_post", func(w http.ResponseWriter, r *http.Request){
		updateBlogPostHandler(w, r, db)
	})

	/*******All refresh/history*****/
	http.HandleFunc("/home", refreshHandler)
	http.HandleFunc("/register", refreshHandler)
	http.HandleFunc("/login", refreshHandler)
	http.HandleFunc("/login_successful", refreshHandler)
	http.HandleFunc("/logout_successful", refreshHandler)
	http.HandleFunc("/add_blog_post", refreshHandler)
	http.HandleFunc("/comments_page", refreshHandler)

	http.HandleFunc("/redirect", refreshHandler)


	fmt.Println("Listening on 3000")
	http.ListenAndServe(":3000", nil)

}
