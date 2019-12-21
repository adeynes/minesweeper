class SquareStatus {}

class NoStatus extends SquareStatus {}

class RevealedStatus extends SquareStatus {}

class FlaggedStatus extends SquareStatus {}

let Status_ = {
    NONE: NoStatus,
    REVEALED: RevealedStatus,
    FLAGGED: FlaggedStatus
};

export default Status_;
