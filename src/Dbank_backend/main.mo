import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";
import Principal "mo:base/Principal";

actor Dbank{
  stable var currentValue: Float = 300;
  stable var startTime = Time.now();

  public func topUp(amount: Float){
    currentValue += amount;
  };

  public func retire(amount: Float){
    let compareValue: Float = currentValue - amount;
    if(compareValue >= 0)
    {
    currentValue -= amount;
    }else{
      Debug.print("I\'m sorry, insufficient balance");
    }
  };

  public query func checkBalance(): async Float{
    return currentValue;
  };

  public func compound(){
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;

    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));

    startTime := currentTime;
  };


}