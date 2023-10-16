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
}