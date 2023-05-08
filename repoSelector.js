const repoSelector = ({ projectName, platform, desktopFramework, addLocalExpressServer, addPuppeteer, addPuppeteerClient, webFramework, mobileFramework, database, addFirebaseReactHooks, paymentSystem } ) => {
    let frontPart = ""
    let backPart = ""
    let branchName = `${frontPart}+${backPart}`


    if (platform === "Desktop") {

            if (desktopFramework === "Electron") {
                if (addLocalExpressServer) {
                    if (!addPuppeteer) {
                        frontPart = "deskElecLocaNPupp"
                    }
                    if (addPuppeteer && addPuppeteerClient) {
                        frontPart = "deskElecLocaPuppClie"
                    }
                    if (addPuppeteer && !addPuppeteerClient) {
                        frontPart = "deskElecLocaPuppNClie"
                    }
                } if (!addLocalExpressServer) {
                    if (!addPuppeteer) {
                        frontPart = "deskElecNLocaNPupp"
                    }
                    if (addPuppeteer && addPuppeteerClient) {
                        frontPart = "deskElecNLocaPuppClie"
                    }
                    if (addPuppeteer && !addPuppeteerClient) {
                        frontPart = "deskElecNLocaPuppNClie"

                    }
                }
            } 

            if (desktopFramework === "Tauri") {
                frontPart = "deskTaur"
            }


    } else if (platform === "Web" ) {
    
            if (webFramework === "React") {
                frontPart = "webReac"
            }
            if (webFramework === "Next.js") {
                frontPart = "webNext"
            }

    } else if (platform === "Mobile") {

        if (mobileFramework === "Expo React Native") {
            frontPart = "mobiExRN"
        }
    }

    if (database === "NoDatabase") {
        backPart = "NDB"

    } else if (database === "Firebase") {

        if (addFirebaseReactHooks) {
            if (paymentSystem === "No payment") {
                backPart = "FireHooNPaym"
            } else if (paymentSystem === "Stripe") {
                backPart = "FireHooStri"
                
            } else if (paymentSystem === "Stripe + COD") {
                backPart = "FireHooStriCOD"
            } else if (paymentSystem === "Stripe + COD + eTN") {
                backPart = "FireHooStriCODeTN"
            }

        } else if (!addFirebaseReactHooks) {
            if (paymentSystem === "No payment") {
                backPart = "FireNHooNPaym"
            } else if (paymentSystem === "Stripe") {
                backPart = "FireNHooStri"
                
            } else if (paymentSystem === "Stripe + COD") {
                backPart = "FireNHooStriCOD"
            } else if (paymentSystem === "Stripe + COD + eTN") {
                backPart = "FireNHooStriCODeTN"
            }
        }
    } else if (database === "MongoDB") {
        backPart = "Mong"
        
    } else if (database === "MySQL") {
        backPart = "MySQ"

    }


    return branchName 

}

module.exports = {repoSelector}