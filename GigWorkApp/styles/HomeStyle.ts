
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563EB",
  },

  subTitle: {
    color: "#64748B",
    marginTop: 4,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  searchInput: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  heroCard: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
  },

  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },

  heroText: {
    color: "#FFF",
    marginVertical: 10,
  },

  heroButton: {
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  heroButtonText: {
    color: "#2563EB",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 15,
  },

  categoryCard: {
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    elevation: 3,
  },

  categoryText: {
    fontWeight: "600",
  },

  workerCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  workerName: {
    fontSize: 18,
    fontWeight: "700",
  },

  workerRole: {
    color: "#64748B",
  },

  workerInfo: {
    marginTop: 5,
  },

  hireButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  hireButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },

  jobCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  jobTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  applyButton: {
    marginTop: 10,
    backgroundColor: "#10B981",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  applyButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
  },

  benefitCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    gap: 10,
    marginBottom: 20,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 40,
  },
});

