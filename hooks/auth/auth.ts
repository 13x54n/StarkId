import { connect, disconnect } from "starknetkit"
import { WebWalletConnector } from "starknetkit/webwallet"
import { InjectedConnector } from "starknetkit/injected"

export const handleConnectDapp = async () => {
    const { wallet, connector, connectorData } = await connect({
        connectors: [
            new InjectedConnector({
                options: { id: "braavos" },
            }),
            new WebWalletConnector(),
            new InjectedConnector({ options: { id: "argentX" } }),
        ],
    })

    if (wallet && connectorData) {
        return { wallet, connector, connectorData }
    }
}

export const disconnectWallet = async () => {
    await disconnect()
    window.location.reload()
}

export const connectOnReload = async () => {
    const { wallet, connector, connectorData } = await connect({
        connectors: [
            new WebWalletConnector(),
            new InjectedConnector({ options: { id: "argentX" } }),
            new InjectedConnector({
                options: { id: "braavos" },
            }),
        ],
        modalMode: "neverAsk" // on-reload connect
    })

    if (wallet && connectorData) {
        return { wallet, connector, connectorData }
    }
}