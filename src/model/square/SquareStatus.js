class SquareStatus {}

class NoStatus extends SquareStatus {}

class RevealedStatus extends SquareStatus {}

class FlaggedStatus extends SquareStatus {}


let SquareStatus_ = {
    NONE: NoStatus,
    REVEALED: RevealedStatus,
    FLAGGED: FlaggedStatus
};


export default SquareStatus_;
