from importlib.metadata import PackageNotFoundError, version


def main() -> None:
    """Print the installed CrewAI version for local setup verification."""
    try:
        crewai_version = version("crewai")
    except PackageNotFoundError:
        raise SystemExit(
            "CrewAI is not installed. Run `npm run crewai:install` from the repository root."
        )

    print(f"CrewAI is installed and ready: {crewai_version}")


if __name__ == "__main__":
    main()
