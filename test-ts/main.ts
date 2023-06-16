import { forEach } from "lodash";
import './product'
const arr: number[] = [1, 2, 3, 4, 5];

forEach(arr, (item) => {
    console.log(item);
});

console.log('Hello World');

let str:string = '你好';

interface IPerson {
    name: string;
    age: number;
}

// str=123

function printPerson(person: IPerson) {
    console.log(person.name, person.age);
}

console.log(str, printPerson({name: 'wmx', age: 18}));
console.log("mets",import.meta.env.VITE_PROXY_URL);
