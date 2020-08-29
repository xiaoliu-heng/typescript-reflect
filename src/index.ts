import "reflect-metadata";
import { PATH_META, METHOD_META } from "./constants"

const creteRequestDecorator = (method: string) => (path: string) => {
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    Reflect.defineMetadata(PATH_META, path, descriptor.value);
    console.log("f()", type, path, descriptor.value);

  };
};

const GET = creteRequestDecorator("get");

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

  @GET("/name")
  getName(): string {
    return "";
  }
}

new Test()

while (true) {

}