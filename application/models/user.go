package user
import "time"
type UserModel struct {
	email string
	password string
	registrationDate time.Time
}

func Validate(u *UserModel) {}
func Save(u *UserModel) {}