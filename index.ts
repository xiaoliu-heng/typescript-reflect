// Import stylesheets
import "./style.css";
import "reflect-metadata";

function f(path?: string) {
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    console.log("f()", type);
    Reflect.defineMetadata("PATH", path, descriptor.value);
  };
}

function g(options?: { item?: Object }) {
  return (target, key): void => {
    const type = Reflect.getMetadata("design:type", target, key);
    console.log("g()", key, type);
    if (options && options.item) {
      console.log("g() item type", key, type, options.item);
    }
  };
}

class Photo {
  url: string;
}

class Test {
  @g()
  name: string;

  @g({ item: Photo })
  photos: Array<Photo>;

  @f()
  setName(): string {
    return "";
  }
}

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;
