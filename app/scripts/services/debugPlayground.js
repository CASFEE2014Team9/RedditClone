
function allServices(mod) {
  var modInst = angular.module(mod);
  var r = {};

  angular.forEach(modInst.requires, function (m) {
    r[m] = allServices(m);
  });
  angular.forEach(modInst._invokeQueue, function (a) {
    var name;
    try {
      name = a[2][0];
      if (typeof name === "string") {
        r[name] = inj(name);
      }
    } catch (e) {
      r[name] = e;
    }
  });
  return r;
}

var allMyServices = allServices('redditcloneApp');