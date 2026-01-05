const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const formatCommentTime = (dateInput) => {
    const date = new Date(dateInput);
    const now = Date.now();
    const diffMs = date.getTime() - now;

    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (Math.abs(diffDays) >= 7) {
        return date.toLocaleDateString();
    }

    if (Math.abs(diffDays) >= 1) {
        return rtf.format(diffDays, "day");
    }

    if (Math.abs(diffHours) >= 1) {
        return rtf.format(diffHours, "hour");
    }

    if (Math.abs(diffMinutes) >= 1) {
        return rtf.format(diffMinutes, "minute");
    }

    return rtf.format(diffSeconds, "second");
};

export default formatCommentTime;
