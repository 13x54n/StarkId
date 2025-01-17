import { connect, disconnect } from "starknetkit"
// import { WebWalletConnector } from "starknetkit/webwallet"
import { InjectedConnector } from "starknetkit/injected"
import { create } from 'zustand'

interface User {
    wallet?: object;
    connector?: object;
    connectorData?: object
}

interface AuthenticationState {
    user: User;
    authenticated: boolean;
    storeUser: (user: User) => void;
    disconnectWallet: () => void;
}

export const useAuthenticationStore = create<AuthenticationState>((set) => ({
    user: {},
    authenticated: false,
    storeUser: (user: User) => set({ user, authenticated: true }),
    disconnectWallet: () => { set({ user: {}, authenticated: false }); disconnectWallet() },
}))

export const handleConnectDapp = async () => {
    const { wallet, connector, connectorData } = await connect({
        connectors: [
            new InjectedConnector({
                options: { id: "braavos" },
            }),
            // new WebWalletConnector(),
            new InjectedConnector({ options: { id: "argentX" } }),
        ],
    })

    if (wallet && connectorData) {
        return { wallet, connector, connectorData }
    }
    return { wallet: null, connector: null, connectorData: null }
}

export const disconnectWallet = async () => {
    await disconnect()
    window.location.reload()
}

export const connectOnReload = async () => {
    const { wallet, connector, connectorData } = await connect({
        connectors: [
            // new WebWalletConnector(),
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
    return { wallet: null, connector: null, connectorData: null }
}