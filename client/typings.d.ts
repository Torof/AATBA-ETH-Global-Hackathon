interface TokenId {
    _hex: string;
    _isBigNumber: boolean;
};
interface SubProfileContract {
    name: string;
    subProfileAddress: string;
    subProfileAddress: string;
    tokenId: TokenId;
}
export interface SubProfile {
    id: number
    name: string
    profilePic: string
    contract: [] | SubProfileContract
    subProfileAddress: string
}

export interface EventType {
    eventName: string
    data: Record<string, any>
    transaction: {
        blockNumber: number
        blockHash: string
        transactionIndex: number
        removed: boolean
        address: string
        data: string
        topics: Array<string>
        transactionHash: string
        logIndex: number
    }
}