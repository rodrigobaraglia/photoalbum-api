import { compose, pipe } from "./composition";
import {
  Composibility,
  Reverse,
  MapReturns,
  MapParams,
  Tail,
  Head,
} from "./utilityTypes";
import { Reverse as _Reverse } from "typescript-tuple";

export function composePipeTestCase() {
  
  function strNum(str: string) {
    console.log(str);
    return 23;
  }
  function numBool(num: number) {
    console.log(num);
    return true;
  }
  function boolArrStr(bool: boolean) {
    console.log(bool);
    return ["hola", "mundo", "hola mundo"];
  }

  function arrStrObj(arrStr: string[]) {
    console.log(arrStr);
    return { str: "hola mundo", num: 42, bool: true, numArr: [1, 2, 3] };
  }
  function objStr(obj: {
    str: string;
    num: number;
    bool: boolean;
    numArr: number[];
  }) {
    console.log(obj);
    return "fin de la prueba";
  }

  const test0 = (s: string) =>
    objStr(arrStrObj(boolArrStr(numBool(strNum(s)))));

  const _test1 = (s: string) =>
    compose(objStr, arrStrObj, boolArrStr, numBool, strNum)(s);
  //  const _test1b = compose(strNum, numBool, boolArrStr, arrStrObj, objStr)
  _test1("start");
  // _test1b("start")
  const _test2 = pipe(strNum, numBool, boolArrStr, arrStrObj, objStr);
  //const _test2b= pipe(objStr,arrStrObj, boolArrStr, numBool, strNum)
  const _test3 = compose(numBool, strNum);
  // const _test4 = pipe(strNum, numBool)
  // const _test5 = compose(boolArrStr, numBool, strNum)

  type test3 = [typeof strNum, typeof numBool];
  type test3b = [typeof strNum, typeof numBool, typeof boolArrStr];
  type test3c = [
    typeof strNum,
    typeof numBool,
    typeof boolArrStr,
    typeof arrStrObj
  ];
  type test3d = [
    typeof strNum,
    typeof numBool,
    typeof boolArrStr,
    typeof arrStrObj,
    typeof objStr
  ];
  type test4 = Composibility<test3>;
  type test5 = MapParams<test3b>;
  type test6 = MapReturns<test3b>;
  type test7 = test6 extends test5 ? true : false;
  type test8 = Reverse<Tail<test5>>;
  type test9 = Tail<_Reverse<test6>>;
  type test10 = test9 extends test8 ? true : false;
  type test11<T extends any[]> = Reverse<Tail<MapParams<T>>>;
  type test12<T extends any[]> = Tail<_Reverse<MapReturns<T>>>;
  type test13 = test11<test3d>;
  type test14 = test12<test3d>;
  type test15 = test14 extends test13 ? true : false;
  // console.log(test1("begin"), test2("begin"))
}
