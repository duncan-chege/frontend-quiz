interface ProgressBarProps {
    currentIndex: number,
    totalQuestions: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({currentIndex, totalQuestions}) => {
    const progress = ((currentIndex + 1)/totalQuestions) * 100;

    return(
        <div className="w-full bg-white shadow-md rounded-full h-4 mb-4 mt-32">
            <div className="bg-purple h-4 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}>
        </div>
    </div>
    )
}

export default ProgressBar;