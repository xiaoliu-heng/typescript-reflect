import "reflect-metadata";
import { PATH_META, METHOD_META } from "./constants"

const creteRequestDecorator = (method: string) => (path: string) => {
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    Reflect.defineMetadata(METHOD_META, method, descriptor.value);
    Reflect.defineMetadata(PATH_META, path, descriptor.value);
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

const mapRequest = (target: Object) => {
  const prototype = Object.getPrototypeOf(target);
  const propertys = Object.getOwnPropertyNames(prototype);

  const res = propertys
    .filter(name => name !== "constructor")
    .map(name => prototype[name])
    .filter(fn => Reflect.getMetadata(METHOD_META, fn) !== undefined)
    .map(fn => ({ fn, path: Reflect.getMetadata(PATH_META, fn), method: Reflect.getMetadata(METHOD_META, fn) }))

  console.log(res);

  return res;
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

mapRequest(new Test())
