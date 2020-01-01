class SquareStatus {}

class NoStatus extends SquareStatus {}

class RevealedStatus extends SquareStatus {}

class FlaggedStatus extends SquareStatus {}


export default {
    NONE: NoStatus,
    REVEALED: RevealedStatus,
    FLAGGED: FlaggedStatus
};
