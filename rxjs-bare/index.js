const { Observable } = require("rxjs");
const { map, filter } = require("rxjs/operators");

const users = {
  data: [
    { status: "active", age: 10 },
    { status: "active", age: 20 },
    { status: "inactive", age: 30 },
    { status: "active", age: 40 },
    { status: "active", age: 51 },
  ],
};

const users2 = {
  data: [
    { status: "active", age: 5 },
    { status: "active", age: 20 },
    { status: "inactive", age: 30 },
    { status: "active", age: 40 },
    { status: "active", age: 51 },
  ],
};

const observable$ = new Observable((subscriber) => {
  subscriber.next(users);
  subscriber.complete();
  subscriber.next(users2);
});

const newObs$ = observable$.pipe(
  filter((users) => users?.data.length > 0),
  map((users) => {
    return users?.data.filter((user) => user.status === "active");
  }),
  map((users) => {
    return users.reduce((sum, user) => sum + user.age, 0) / users.length;
  }),
  map((averageAge) => {
    if (averageAge > 30) {
      return "Average age is greater than 30";
    } else {
      throw new Error("Average age is less than 30");
    }
  })
);

const observer = {
  next: (value) => console.log("observer got a value", value),
  error: (err) => console.log("observer got an error", err),
  complete: () => console.log("observer got a complete notification"),
};

const observer2 = {
  next: (value) => console.log("observer got a value", value),
  error: (err) => console.log("observer got an error", err),
  complete: () => console.log("observer got a complete notification"),
};

newObs$.subscribe(observer);
