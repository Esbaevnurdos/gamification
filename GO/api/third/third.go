package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
)

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

var users []User
var nextUserID int

func loadUsers() {
	data, err := os.ReadFile("users.json")
	if err != nil {
        if os.IsNotExist(err) {
			fmt.Println("No existing user data found.")
			nextUserID = 1
			return
		}
 	}
	
	json.Unmarshal(data, &users)

	for _, user := range users {
		id, _ := strconv.Atoi(user.ID)
		if id >= nextUserID {
			nextUserID = id + 1
		}
	}
}

func saveUsers() {
	data, err := json.MarshalIndent(users, "", "  ")
	if err != nil {
		log.Fatalf("Failed to marshal users")
	}

	os.WriteFile("users.json", data, 0644)
}

func registerUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user User
	json.NewDecoder(r.Body).Decode(&user)

	for _, u := range users {
		if u.Username == user.Username {
			http.Error(w, "Username already exists", http.StatusBadRequest)
			return
		}
	}

	user.ID = strconv.Itoa(nextUserID)
	nextUserID++
	users = append(users, user)
	saveUsers()
	json.NewEncoder(w).Encode(user)
}

func loginUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var checkers struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	json.NewDecoder(r.Body).Decode(&checkers)
	
	for _, u := range users {
		if u.Username == checkers.Username && u.Password == checkers.Password {
			json.NewEncoder(w).Encode(map[string]string{"message":"Login successfuly!"})
			return
		}
	}
}

func getAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func updateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
	id := params["id"]

	for i, u := range users {
		if u.ID == id {
			var updateUser User
			json.NewDecoder(r.Body).Decode(&updateUser)

			updateUser.ID = id
			users[i]= updateUser
			saveUsers()
			json.NewEncoder(w).Encode(updateUser)
			return
		}
	}
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	id := params["id"]

	for i, u := range users {
		if u.ID == id {
			users = append(users[:i], users[i+1:]...)
			saveUsers()
			json.NewEncoder(w).Encode(map[string]string{"message": "User deleted"})
            return
		}
	}
}

func getUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    id := params["id"]

	for _, user := range users {
		if user.ID == id {
			json.NewEncoder(w).Encode(user)
			return
		}
	}
}

func main() {
	loadUsers()

	r := mux.NewRouter()

	// Corrected route paths
	r.HandleFunc("/api/create", registerUser).Methods("POST")
	r.HandleFunc("/api/login", loginUser).Methods("POST")
	r.HandleFunc("/api/users", getAllUsers).Methods("GET")
	r.HandleFunc("/api/users/{id}", getUser).Methods("GET")  // Corrected path
	r.HandleFunc("/api/update/{id}", updateUser).Methods("PUT")  // Corrected path
	r.HandleFunc("/api/delete/{id}", deleteUser).Methods("DELETE")  // Corrected path
	
	http.ListenAndServe(":8080", r)


}